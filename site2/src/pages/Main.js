// Main.js

import React from 'react';
import { Link } from 'react-router-dom';

import {ReactComponent as Emergency} from './Emergency.svg';
import {ReactComponent as Friend} from './Friend.svg';
import {ReactComponent as Experience} from './Experience.svg';
import {ReactComponent as Settings} from './Settings.svg';

import Drink0 from'./shotglass/glass0.svg';
import Drink1 from'./shotglass/glass1.svg';
import Drink2 from'./shotglass/glass2.svg';
import Drink3 from'./shotglass/glass3.svg';
import Drink4 from'./shotglass/glass4.svg';
import Drink5 from'./shotglass/glass5.svg';




class Main extends React.Component {
   
  constructor(props) {
    super(props);

    this.state = {
      showExperience: false,
      showSettings: false,
    };

    
    // Bind the event handlers to the instance
    this.handleExperienceClick = this.handleExperienceClick.bind(this);
    this.handleEmergencyClick = this.handleEmergencyClick.bind(this);
    this.handleFriendClick = this.handleFriendClick.bind(this);
  }

  handleExperienceClick() {
    let tBac = prompt('Set target BAC');
    try{
      this.props.setTarget(Number(tBac))
    }catch{}
    
    this.setState({ showExperience: true, showSettings: false });
  }

  handleEmergencyClick() {
    alert('Emergency services called');
  }

  handleFriendClick() {
    alert('A friend has been contacted');
  }

  render() {
    const { showExperience, showSettings } = this.state;

    const containerStyle = {
      position: 'relative',
      height: '100vh', // Set the container height to the full viewport height
    };

    const circleContainerStyle = {
      position: 'absolute',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
    };

    const BACcircleStyle = {
      width: '52vmin',
      height: '52vmin',
      borderRadius: '50%',
      backgroundColor: 'blue', // You can change the color as desired
      margin: '0 auto', // Center the circle horizontally
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const BACtextStyle = {
      color: 'white',
      fontSize: '10vmin',
    };

    const emergencyStyle = {
      borderRadius: '50%',
      position: 'absolute',
      top: '0',
      left: '0',
      cursor: 'pointer',
    };

    const friendStyle = {
      borderRadius: '50%',
      position: 'absolute',
      top: '0',
      right: '0',
      cursor: 'pointer',
    };

    const expCircleStyle = {
      borderRadius: '50%',
      position: 'absolute',
      bottom: '0',
      left: '0',
      cursor: 'pointer',
    };

    const settingsCircleStyle = {
      borderRadius: '50%',
      position: 'absolute',
      bottom: '0',
      right: '0',
      cursor: 'pointer',
    };

    const shotglassStyle = {
      borderRadius: '50%',
      position: 'absolute',
      bottom: '0',
      left: '50%',
      transform: 'translateX(-50%)', // Center the pink circle horizontally
      cursor: 'pointer',
    };

    const textStyle = {
      color: 'black', // You can change the text color as desired
    };

    const ringStyle = {
      width: '185vw',
      height: '185vw',
      borderRadius: '50%',
      border: '10px solid orange', // You can change the color and size as desired
      position: 'absolute',
      bottom: '-150vw',
      left: '50%',
      transform: 'translateX(-50%)',
    };
    let drinks = [Drink0, Drink1, Drink2, Drink3, Drink4, Drink5]

    return (
      <div className='Main'style={containerStyle}>
      <div style={ringStyle}></div>
        <div style={circleContainerStyle}>
          <div className='GUI' style={textStyle}>Your BAC is</div>
          <div style={BACcircleStyle}>
          <div id='BAC' style={BACtextStyle}>{this.props.BAC.toFixed(2)+"%"}</div>
          </div>
          <div className='GUI' style={textStyle}>You are BOOZIN</div>
        </div>
        <div
        class='icon'
        style={emergencyStyle}
        onClick={this.handleEmergencyClick}
        >
          <Emergency />
        </div>
        <div
        class='icon'
        style={friendStyle}
        onClick={this.handleFriendClick}
        >
          <Friend />
        </div>
        <div 
        class='icon'
        onClick={this.handleExperienceClick}
        style={expCircleStyle}>
          <Experience />
        </div>
        <Link 
        class='icon'
        to='../settings' 
        style={settingsCircleStyle}> 
        <Settings />
          </Link>
        <div style={shotglassStyle}>
          <img onClick={this.props.takeDrink} src={drinks[Math.min(this.props.drinkIndex, 5)]}/>
        </div>
      </div>
      
    );
  }
}

export default Main;
