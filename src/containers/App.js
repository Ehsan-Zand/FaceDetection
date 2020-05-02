import React, { Component } from 'react';
import './App.css';
import clarifai from 'clarifai';
import Particles from 'react-particles-js';
import particlesParams from './ParticlesParams.json';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';

const app = new clarifai.App({
  apiKey: '4184ea05c14a47adbfb17e7817180a98'
});

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: []
    }
  }
  
  findFaceBox = (response) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxes = response.outputs[0].data.regions.map(element => {
      return(
        {left: element.region_info.bounding_box.left_col * width,
          top: element.region_info.bounding_box.top_row * height,
          right: width - element.region_info.bounding_box.right_col * width,
          bottom: height - element.region_info.bounding_box.bottom_row * height
        }
        );
      });
      this.setState({box: boxes});
    }
    
    onInputChange = (event) => {
      this.setState({input: event.target.value});
    }
    
    onSubmitButton = () => {
      this.setState({imageURL: this.state.input});
      app.models
      .predict(clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        this.findFaceBox(response);
      })
      .catch(err => console.log(err));
    }
    
    render(){
      return (
        <div className="App">
        <Particles className='particles' params={particlesParams} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onSubmitButton={this.onSubmitButton}
        />
        <FaceRecognition imageURL={this.state.imageURL} box={this.state.box} />
        </div>
        );
      }
    }
    
    export default App;
    