import React from 'react';
import logo from './logo.svg';
import './App.css';

const drums = [
  {name:'Crash', src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587948/fcc-drum-machine/cymbals%202/cymbalcrash1.mp3', key: "Q", keycode: 81},
  {name:'Side-Stick', src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532580120/sample-swap/drums-and-single-hits/china/big_china_cym.mp3', key: "W", keycode: 87},
  {name:'Cowbell', src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587867/fcc-drum-machine/cowbells/cowbell1.mp3', key: "E", keycode: 69},
  {name: "Hi-Hat-Open", src:
"https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587997/fcc-drum-machine/hi-hats/hihat1.mp3", key: "A", keycode: 65},
  {name: "Hi-Hat-Closed", src:
"https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587997/fcc-drum-machine/hi-hats/hihat4.mp3", key: "S", keycode: 83},
  {name:'Ride', src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532582454/sample-swap/drums-and-single-hits/rides/RIDE_S_11.mp3', key: "D", keycode: 68},
  {name:'Snare', src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587362/fcc-drum-machine/snare-drums/snaredrum1.mp3', key: "Z", keycode: 90},
  {name:'Kick', src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587165/fcc-drum-machine/kick-drums/kick-drum-7.mp3', key: "X", keycode: 88},
  {name: "Toms", src: "https://res.cloudinary.com/dzsmdyknz/video/upload/v1532588185/fcc-drum-machine/tom-toms/tomtomdrum3.mp3", key: "C", keycode: 67},
];
class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleClick(e) {
    const audio = document.getElementById(this.props.padkey)
    audio.play();
    this.props.displaypad(this.props.padname)
    audio.currentTime = 0;
  }
  handleKeyPress(e){
      if (e.keyCode === this.props.padcode) {
        this.handleClick();
      }
  }
  render () {
    return (
    <button className="drum-pad" id={this.props.padname} onClick={this.handleClick}>{this.props.padkey}<audio src={this.props.padsrc} className="clip" id={this.props.padkey}></audio></button>
    )
  }
}

class Drumpads extends React.Component {
  render() {
    const pads = drums.map((x,y) => <Drum padname={x.name} padsrc={x.src} padkey={x.key} padcode={x.keycode} displaypad={this.props.displaypad}/>);
    return (
      <div>{pads}</div>             
    );
  }
}

class Display extends React.Component {
  render() {
    return (
    <p id="display">{this.props.text}</p>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      volume: 0.5,
      mode: "drums",
      display: "blanktext"
    };
    this.handleDisplay = this.handleDisplay.bind(this);
  }
  handleDisplay(e) {
    this.setState({display: e});
  }
  render() {
    return (
      <div id="drum-machine">
        <h1>Drum Machine</h1>
        <Display text={this.state.display} />
        <Drumpads displaypad={this.handleDisplay}/>
      </div>
    );
  }
}

export default App;
