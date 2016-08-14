import React from "react";
import TopHeader from "./TopHeader";
import InnerDiv from "./InnerDiv";
import BlankLeftDiv from "./BlankLeftDiv"

var containerStyle = {
  margin: "0 10px 10px 0",
  maxHeight: "600px"
};

export default class Container extends React.Component {
  render(){
    return (
     <div style={containerStyle}>
      <TopHeader />
      <InnerDiv labelleft="Purchase Price" labelright="Interest Rate" dollarsignleft="$" />
      <InnerDiv labelleft="Down Payment" labelright="Principal + Interest" dollarsignleft="$" dollarsignright="$"/>
      <InnerDiv labelleft="Estimated Monthly PMI" labelright="Taxes" dollarsignleft="$" dollarsignright="$"/>
      <BlankLeftDiv labelright="Total Payment" dollarsignright="$" />
     </div>
    );
  }
}