import React, { Component } from "react";
import "./App.css";
import clarifai from "clarifai";
import Particles from "react-particles-js";
import particlesParams from "./ParticlesParams.json";
import Signin from "../components/Signin/Signin";
import Register from "../components/Register/Register";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import Rank from "../components/Rank/Rank";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";

const app = new clarifai.App({
  apiKey: "4184ea05c14a47adbfb17e7817180a98",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: [],
      route: "",
      isSignedIn: false,
    };
  }

  onRouteChange = (route) => {
    if (route === "signin") this.setState({ isSignedIn: false });
    else if (route === "home") this.setState({ isSignedIn: true });
    this.setState({ route: route });
  };

  findFaceBox = (response) => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    const boxes = response.outputs[0].data.regions.map((element) => {
      return {
        left: element.region_info.bounding_box.left_col * width,
        top: element.region_info.bounding_box.top_row * height,
        right: width - element.region_info.bounding_box.right_col * width,
        bottom: height - element.region_info.bounding_box.bottom_row * height,
      };
    });
    this.setState({ box: boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onSubmitButton = () => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict(clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => {
        this.findFaceBox(response);
      })
      .catch((err) => console.log(err));
  };

  render() {
    let page;
    switch (this.state.route) {
      case "home":
        page = (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmitButton={this.onSubmitButton}
            />
            <FaceRecognition
              imageURL={this.state.imageURL}
              box={this.state.box}
            />
          </div>
        );
        break;
      case "register":
        page = <Register onRouteChange={this.onRouteChange} />;
        break;
      case "signin":
        page = <Signin onRouteChange={this.onRouteChange} />;
        break;
      default:
        page = <Signin onRouteChange={this.onRouteChange} />;
        break;
    }

    return (
      <div className="App">
        <Particles className="particles" params={particlesParams} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {page}
      </div>
    );
  }
}

export default App;
