import React from "react";
import TopHeader from "./TopHeader";
import InnerDiv from "./InnerDiv";
import BlankLeftDiv from "./BlankLeftDiv";
import HalfDiv from "./HalfDiv";
import InputBox from "./InputBox";

var containerStyle = {
  margin: "0 10px 10px 0",
  maxHeight: "600px"
};
export default class Container extends React.Component {
  constructor(){
    super();
    this.state = {
      purchasePrice: "200000.00",
      interestRate: "3.25",
      taxes: "4500.00", 
      downpayment: "10000.00"
    };
  }
  purchasePriceHandler(purchasePrice){
    this.setState({purchasePrice});
  }
  interestRateHandler(interestRate){
    this.setState({interestRate});
  }
  taxesHandler(taxes){
    this.setState({taxes});
  }
  downpaymentHandler(downpayment){
    this.setState({downpayment});
  }
  calculateTotalPayment(){
    const pp = parseFloat(this.state.purchasePrice);
    const dp = parseFloat(this.state.downpayment);
    const tax = parseFloat(this.state.taxes);
    const interest = parseFloat(this.state.interestRate);
    return parseFloat(((pp-dp)/30/12)+(interest/12/100*pp)+(tax)/12).toFixed(2)
  }
  render(){
    return (
     <div style={containerStyle}>
      <TopHeader title="Mortgage Details"/>

      <InnerDiv 
        leftChangeHandler={this.purchasePriceHandler.bind(this)} 
        rightChangeHandler={this.interestRateHandler.bind(this)}
        labelleft="Purchase Price" dollarsignleft="$" 
        valueleft={this.state.purchasePrice}  
        labelright="APR Interest Rate"
        valueright={this.state.interestRate} />

      <InnerDiv 
        leftChangeHandler={this.downpaymentHandler.bind(this)}
        valueleft={this.state.downpayment}
        labelleft="Down Payment" 
        labelright="Principal + Interest" 
        dollarsignleft="$" 
        dollarsignright="$"/>

      <InnerDiv 
        rightChangeHandler={this.taxesHandler.bind(this)}
        labelleft="Estimated Monthly PMI"
        labelright="Taxes" 
        valueright={this.state.taxes}
        dollarsignleft="$" 
        dollarsignright="$"/>

      <BlankLeftDiv 
        labelright="Total Payment" 
        dollarsignright="$" 
        valueright={this.calculateTotalPayment()} />
}
      <TopHeader title="Rent vs Buy" />

      <HalfDiv label="Your Monthly Rent Expenses" /><HalfDiv label="Estimated Mortgage Expenses" />
     
      <InnerDiv 
        labelleft="Monthly Rent Payment" 
        dollarsignleft="$" 
        labelright="Principal and Interest Payment" 
        dollarsignright="$" />
      
      <BlankLeftDiv 
        labelright="Estimated Monthly Taxes" 
        dollarsignright="$" />
     </div>
    );
  }
}