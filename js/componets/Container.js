import React from "react";
import TopHeader from "./TopHeader";

var containerStyle = {
  margin: "0 10px 10px 0",
  maxHeight: "600px"
};

export default class Container extends React.Component {
  render(){
    return (
     <div style={containerStyle}>
      <TopHeader />
     </div>
    );
  }
}