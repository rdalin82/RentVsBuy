import React from 'react';
import LabelDiv from "./LabelDiv";
import AmountDiv from "./AmountDiv";

export default class InnerDiv extends React.Component { 
  render(){
    return (
        <div>
          <LabelDiv label={this.props.labelleft} />
          <AmountDiv dollarsign={this.props.dollarsignleft} />
          <LabelDiv label={this.props.labelright} />
          <AmountDiv dollarsign={this.props.dollarsignright}/>
        </div>
      );
  }
}