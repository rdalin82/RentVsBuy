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
      downpayment: "10000.00", 
      rentPayment: "1500.00", 
      rentInsurance: "15.83", 
      homeownerInsurance: "37.50",
      assessments: "200.00"
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
  rentPaymentHandler(rentPayment){
    this.setState({rentPayment})
  }
  rentInsuranceHandler(rentInsurance){
    this.setState({rentInsurance});
  }
  homeownerInsuranceHandler(homeownerInsurance){
    this.setState({homeownerInsurance});
  }
  assessmentsHandler(assessments){
    this.setState({assessments});
  }
  calculateTotalPayment(){
    const pp = parseFloat(this.state.purchasePrice);
    const dp = parseFloat(this.state.downpayment);
    const tax = parseFloat(this.state.taxes);
    const interest = parseFloat(this.state.interestRate);
    return ((pp-dp)/30/12)+(interest/12/100*pp)
  }
  calculateFinalHomePayment(){
    const assess = parseFloat(this.state.assessments);
    const pmi = parseFloat(this.state.purchasePrice*0.01/12);
    const mt = parseFloat(this.state.taxes/12);
    const hi = parseFloat(this.state.homeownerInsurance);
    return parseFloat(mt+hi+pmi+assess);
  }
  calculateRentPayment(){
    const rp = parseFloat(this.state.rentPayment);
    const ri = parseFloat(this.state.rentInsurance);
    return parseFloat(rp+ri);
  }
  final(){
    const total = this.calculateTotalPayment();
    const fin = this.calculateFinalHomePayment();
    return parseFloat(total+fin).toFixed(2);
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
        valueright={parseFloat(this.calculateTotalPayment()).toFixed(2)} />

      <TopHeader title="Rent vs Buy" />

      <HalfDiv label="Your Monthly Rent Expenses" /><HalfDiv label="Estimated Mortgage Expenses" />
     
      <InnerDiv 
        labelleft="Monthly Rent Payment" 
        dollarsignleft="$" 
        valueleft={this.state.rentPayment}
        leftChangeHandler={this.rentPaymentHandler.bind(this)}
        labelright="Principal and Interest Payment" 
        valueright={parseFloat(this.calculateTotalPayment()).toFixed(2)}
        dollarsignright="$" />
      
      <BlankLeftDiv 
        labelright="Estimated Monthly Taxes" 
        valueright={parseFloat(this.state.taxes/12).toFixed(2)}
        dollarsignright="$" />

      <InnerDiv 
        labelleft="Monthly Renter's Insurance" 
        dollarsignleft="$" 
        valueleft={this.state.rentInsurance}
        leftChangeHandler={this.rentInsuranceHandler.bind(this)}
        labelright="Estimated Homeowner's Insurance" 
        valueright={this.state.homeownerInsurance}
        rightChangeHandler={this.homeownerInsuranceHandler.bind(this)}
        dollarsignright="$" />

      <BlankLeftDiv 
        labelright="Pirvate Mortgage Insurance"  
        valueright={parseFloat(this.state.purchasePrice*0.005/12).toFixed(2)}
        dollarsignright="$" />

      <BlankLeftDiv 
        labelright="Estimated Assessments"
        valueright={this.state.assessments} 
        rightChangeHandler={this.assessmentsHandler.bind(this)}
        dollarsignright="$" />

      <InnerDiv 
        labelleft="Total Monthly Rent Payment" 
        dollarsignleft="$" 
        valueleft={this.calculateRentPayment()}
        labelright="Total Monthly Purchase Payment"
        valueright={this.final()}
        dollarsignright="$" />
     </div>
    );
  }
}