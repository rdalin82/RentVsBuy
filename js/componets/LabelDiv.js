import React from 'react';
var innerStyle = { 
  width: "40%",
  display: "inline-block",
  float: "left", 
  "min-height": "40px",
  padding: "0", 
  "font-size": "90%"
}

export default class LabelDiv extends React.Component { 
  render(){
    return (
        <div style={innerStyle}>{this.props.label}</div>
      );
  }
}