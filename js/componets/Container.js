import React from "react";
import TopHeader from "./TopHeader";
import InnerDiv from "./InnerDiv";
import BlankLeftDiv from "./BlankLeftDiv";
import HalfDiv from "./HalfDiv";
import InputBox from "./InputBox";
import MortgageStore from "../stores/MortgageStore";
import * as MortgageActions from "../actions/MortgageActions";

var containerStyle = {
  margin: "0 10px 10px 0",
  maxHeight: "600px"
};
export default class Container extends React.Component {
  constructor(){
    super();
    this.getMortgage = this.getMortgage.bind(this);
    this.state = {
      mortgage: MortgageStore.mortgageDetails(),
      rental: {
        rentPayment: "1500.00",
        rentInsurance: "15.83"
      }
    };
  }
  componentWillMount(){
    MortgageStore.on("change", this.getMortgage);
  }
  componentWillUnMount(){
    MortgageStore.removeListener("change", this.mortgageDetails);
  }
  getMortgage(){
    this.setState({
      mortgage: MortgageStore.mortgageDetails(),
    })
  }
  reloadMortgage(){
    MortgageActions.reloadMortgage();
  }

  rentPaymentHandler(rentPayment){
    this.setState({rentPayment})
  }
  rentInsuranceHandler(rentInsurance){
    this.setState({rentInsurance});
  }
  calculateTotalPayment(){
    const pp = parseFloat(this.state.mortgage.purchasePrice);
    const dp = parseFloat(this.state.mortgage.downpayment);
    const tax = parseFloat(this.state.mortgage.taxes);
    const interest = parseFloat(this.state.mortgage.interestRate);
    return ((pp-dp)/30/12)+(interest/12/100*pp)
  }
  calculateFinalHomePayment(){
    const assess = parseFloat(this.state.mortgage.assessments);
    const pmi = parseFloat(this.state.mortgage.purchasePrice*0.01/12);
    const mt = parseFloat(this.state.mortgage.taxes/12);
    const hi = parseFloat(this.state.mortgage.homeownerInsurance);
    return parseFloat(mt+hi+pmi+assess);
  }
  calculateRentPayment(){
    const rp = parseFloat(this.state.rental.rentPayment);
    const ri = parseFloat(this.state.rental.rentInsurance);
    return parseFloat(rp+ri);
  }
  finalCalc(){
    const total = this.calculateTotalPayment();
    const fin = this.calculateFinalHomePayment();
    return parseFloat(total+fin).toFixed(2);
  }
  ////////
  render(){
    return (
     <div style={containerStyle}>
      <TopHeader title="Mortgage Details"/>

      <InnerDiv 
        labelleft="Purchase Price" dollarsignleft="$" 
        leftChangeHandler={MortgageActions.setPurchasePrice.bind(this)} 
        valueleft={this.state.mortgage.purchasePrice} 
        labelright="APR Interest Rate"
        rightChangeHandler={MortgageActions.setInterestRate.bind(this)}
        valueright={this.state.mortgage.interestRate} />

      <InnerDiv 
        leftChangeHandler={MortgageActions.setDownpayment.bind(this)}
        valueleft={this.state.mortgage.downpayment}
        labelleft="Down Payment" 
        labelright="Principal + Interest" 
        dollarsignleft="$" 
        dollarsignright="$"/>

      <InnerDiv 
        rightChangeHandler={MortgageActions.setTaxes.bind(this)}
        labelleft="Estimated Monthly PMI"
        labelright="Taxes" 
        valueright={this.state.mortgage.taxes}
        dollarsignleft="$" 
        dollarsignright="$"/>

      <BlankLeftDiv 
        labelright="Total Monthly Payment(Interest and Principal)" 
        dollarsignright="$" 
        valueright={parseFloat(this.calculateTotalPayment()).toFixed(2)} />

      <TopHeader title="Rent vs Buy" />

      <HalfDiv label="Your Monthly Rent Expenses" /><HalfDiv label="Estimated Mortgage Expenses" />
     
      <InnerDiv 
        labelleft="Monthly Rent Payment" 
        dollarsignleft="$" 
        valueleft={this.state.rental.rentPayment}
        leftChangeHandler={this.rentPaymentHandler.bind(this)}
        labelright="Principal and Interest Payment" 
        valueright={parseFloat(this.calculateTotalPayment()).toFixed(2)}
        dollarsignright="$" />
      
      <BlankLeftDiv 
        labelright="Estimated Monthly Taxes" 
        valueright={parseFloat(this.state.mortgage.taxes/12).toFixed(2)}
        dollarsignright="$" />

      <InnerDiv 
        labelleft="Monthly Renter's Insurance" 
        dollarsignleft="$" 
        valueleft={this.state.rental.rentInsurance}
        leftChangeHandler={this.rentInsuranceHandler.bind(this)}
        labelright="Estimated Homeowner's Insurance" 
        valueright={this.state.mortgage.homeownerInsurance}
        rightChangeHandler={MortgageActions.setHomeownersInsurance.bind(this)}
        dollarsignright="$" />

      <BlankLeftDiv 
        labelright="Pirvate Mortgage Insurance"  
        valueright={parseFloat(this.state.mortgage.purchasePrice*0.005/12).toFixed(2)}
        dollarsignright="$" />

      <BlankLeftDiv 
        labelright="Estimated Assessments"
        valueright={this.state.mortgage.assessments} 
        rightChangeHandler={MortgageActions.setAssessments.bind(this)}
        dollarsignright="$" />

      <InnerDiv 
        labelleft="Total Monthly Rent Payment" 
        dollarsignleft="$" 
        valueleft={this.calculateRentPayment()}
        labelright="Total Monthly Purchase Payment"
        valueright={this.finalCalc()}
        dollarsignright="$" />
     </div>
    );
  }
}