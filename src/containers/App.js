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
      imageURL: ''
    }
    
  }
  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  
  onSubmitButton = () => {
    this.setState({imageURL: this.state.input});
    app.models
    .predict(clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        console.log(err);
      }
      );
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
        <FaceRecognition imageURL={this.state.imageURL} />
        </div>
        );
      }
    }
    
    export default App;
    