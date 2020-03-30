import React from 'react';
import '../src/App.css';
import {FaVolumeMute, FaVolumeDown, FaVolumeUp, FaPowerOff, FaToggleOn} from 'react-icons/fa'

const drums = [
  {name:'Crash', src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532587948/fcc-drum-machine/cymbals%202/cymbalcrash1.mp3', key: "Q", keycode: 81},
  {name:'Gong', src:'https://res.cloudinary.com/dzsmdyknz/video/upload/v1532580120/sample-swap/drums-and-single-hits/china/big_china_cym.mp3', key: "W", keycode: 87},
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

const electronic = [
  {name: 'Heater-1', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', key: 'Q', keycode: 81}, 
  {name: 'Heater-2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', key: 'W', keycode: 87}, 
  {name: 'Heater-3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', key: 'E', keycode: 69}, 
  {name: 'Heater-4', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', key: 'A', keycode: 65}, 
  {name: 'Clap', src:'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', key: 'S', keycode: 83}, 
  {name: 'Stick', src: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3', key: 'D', keycode: 68}, 
  {name: "Chord-1", src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3', key: 'Z', keycode: 90}, 
  {name: 'Chord-2', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3', key: 'X',  keycode: 88}, 
  {name: 'Chord-3', src: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3', key: 'C', keycode: 67}
];

function Title(props) {
  return (
    <div>
    <h1 className="title"><span className="lessweight">DRUM</span>MACHINE</h1>
    <button className={`powercontainer`}onClick={props.powerclick}><div className={`power-off ${props.power ? "power-on" : "" }`}><FaPowerOff/></div></button>
    </div>
  );
}
class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: ""
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.activateDrum = this.activateDrum.bind(this);
    this.deactivateDrum = this.deactivateDrum.bind(this);
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
    audio.currentTime = 0;
    audio.volume = this.props.volume / 100
    this.props.displaypad(this.props.padname)
    this.activateDrum();
    setTimeout(this.deactivateDrum, 200);
  }
  handleKeyPress(e){
      if (e.keyCode === this.props.padcode) {
        this.handleClick();
      }
  }
  activateDrum() {
    this.setState({active: "drum-pad-active"});
  }
  deactivateDrum() {
    this.setState({active: ""});
  }
  render () {
    return (
    <button className={`drum-pad ${this.state.active}`} id={this.props.padname} onClick={this.handleClick}>{this.props.padkey}<audio src={this.props.padsrc} className="clip" id={this.props.padkey}><track src="" kind="captions" srclang="en" label="English"></track></audio></button>
    )
  }
}

class Drumpads extends React.Component {
  render() {
    const acoustic = drums.map((x,y) => <Drum padname={x.name} padsrc={x.src} padkey={x.key} padcode={x.keycode} displaypad={this.props.displaypad} volume={this.props.volume}/>);
    const electric = electronic.map((x,y) => <Drum padname={x.name} padsrc={x.src} padkey={x.key} padcode={x.keycode} displaypad={this.props.displaypad} volume={this.props.volume}/>);
    const padsoff = drums.map( x =><button className="drum-pad-off">{x.key}</button>);
    if (this.props.power === true && this.props.style === "Acoustic") {
      return (
      <div className="pads">{acoustic}</div>   
    );}
    else if (this.props.power === true && this.props.style === "Electric") {
      return (
      <div className="pads">{electric}</div>   
    );}
    return (<div className="pads">{padsoff}</div>);
  }
}

class Display extends React.Component {
  render() {
    const volume = this.props.volume;
    const power = this.props.power;
    return (
    <div>
      <div id="display">
        <p className={`textdisplay ${power ? "" : "textdisplayoff"}`}>{this.props.text}</p>
        <div>{power ? <p className="volumedisplay">Volume: {volume}</p> : <p className="volumedisplay"></p>}
          {power ? <p className="styledisplay">Style: {this.props.style}</p> : <p className="styledisplay"></p>}</div>
      </div>
      <div className="slidecontainer">
        {power ? <div className={`volumeicon`}>{volume === 0 || volume === "0" ? <FaVolumeMute /> : volume > 0 && volume < 50 ? <FaVolumeDown /> : <FaVolumeUp />}</div> : <div className="volumeicon"><FaVolumeMute /></div>}     
        <input type="range" min="0" max="100" step="1" value={volume} className="slider" id="myRange" onChange={this.props.volumeChange}/>
      </div>
      <div className="stylecontainer">
      <div className="styleswitch">
        <div className="stylelabel">STYLE</div>
        <button onClick={this.props.click} className={`stylebuttoncontainer`}><div className={`toggle ${this.props.style === "Acoustic" ? "" : "toggleelectric"} ${power ? "" : "toggleoff"}`}><FaToggleOn /></div></button>
      </div>
    </div>
    </div>
    );
  }
}

class DrumApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      volume: 50,
      display: "Rock on!",
      style: "Acoustic"
    };
    this.handleDisplay = this.handleDisplay.bind(this);
    this.handlePower = this.handlePower.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleStyle = this.handleStyle.bind(this);
  }
  handleDisplay(e) {
    this.setState({display: e});
  }
  handlePower(e) {
    e.preventDefault();
    this.setState(prevState => (
      {power: !prevState.power, display: `${this.state.power ? '' : 'Rock on!'}`}
    ));
  }
  handleVolume(e) {
    this.setState({volume: e.target.value})
  }
  handleStyle(e) {
    this.setState({style: `${this.state.style === "Acoustic" ? "Electric" : "Acoustic"}`})
  }
  render() {
    return (
      <div id="drum-machine">
        <Title className="top" powerclick={this.handlePower} power={this.state.power}/>
        <div className="flex">
          <Drumpads displaypad={this.handleDisplay} power={this.state.power} volume={this.state.volume} style={this.state.style}/>
          <Display text={this.state.display} volume={this.state.volume} power={this.state.power} volumeChange={this.handleVolume} style={this.state.style} click={this.handleStyle}/>    
        </div>
      </div>
    );
  }
}

export default DrumApp;