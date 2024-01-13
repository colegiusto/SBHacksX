// Items.js

import React from 'react';

class Circle extends React.Component {
  render() {
    const containerStyle = {
      position: 'relative',
      height: '100vh', // Set the container height to the full viewport height
    };

    const circleContainerStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
    };

    const circleStyle = {
      width: '60vmin',
      height: '60vmin',
      borderRadius: '50%',
      backgroundColor: 'blue', // You can change the color as desired
      margin: '0 auto', // Center the circle horizontally
    };

    const topLeftCircleStyle = {
      width: '27vmin',
      height: '27vmin',
      borderRadius: '50%',
      backgroundColor: 'green', // You can change the color as desired
      position: 'absolute',
      top: '0',
      left: '0',
    };

    const topRightCircleStyle = {
      width: '27vmin',
      height: '27vmin',
      borderRadius: '50%',
      backgroundColor: 'red', // You can change the color as desired
      position: 'absolute',
      top: '0',
      right: '0',
    };

    const textStyle = {
      color: 'black', // You can change the text color as desired
    };

    const ringStyle = {
        width: '133vw',
        height: '133vw',
        borderRadius: '50%',
        border: '10px solid orange', // You can change the color and size as desired
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
      };

    return (
      <div style={containerStyle}>
        <div style={circleContainerStyle}>
        <div style={textStyle}>Your Text Here</div>
          <div style={circleStyle}></div>
        <div style={textStyle}>Your Text Here</div>
        </div>
        <div style={topLeftCircleStyle}></div>
        <div style={topRightCircleStyle}></div>
        <div style = {ringStyle}></div>
      </div>
    );
  }
}

export default Circle;
