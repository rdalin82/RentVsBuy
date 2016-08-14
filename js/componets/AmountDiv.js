import React from 'react';
import InputBox from "./InputBox";

var paymentStyle = {
  width: "10%", 
  display: 'inline-block',
  float: "left", 
  "min-height": "40px",
  padding: "0", 
  "font-size": "90%"
}
export default class AmountDiv extends React.Component { 
  render(){
    return (
      <div style={paymentStyle}>
        {this.props.dollarsign}<InputBox />
      </div>
      );
  }
}