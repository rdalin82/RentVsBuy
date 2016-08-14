import React from 'react';
import LabelDiv from "./LabelDiv";
import AmountDiv from "./AmountDiv";
var paymentStyle = {
  width: "10%", 
  display: 'inline-block',
  float: "left", 
  "min-height": "40px",
  padding: "0", 
  "font-size": "90%"
}
export default class BlankLeftDiv extends React.Component { 
  render(){
    return (
        <div>
          <LabelDiv label={this.props.labelleft} />
          <div style={paymentStyle} /> 
          <LabelDiv label={this.props.labelright} />
          <AmountDiv dollarsign={this.props.dollarsignright}/>
        </div>
      );
  }
}