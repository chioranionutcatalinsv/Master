import React from "react";
import Map from "../components/Map";
export const MyLocation = ({ navigation }) => {
  return (
    <React.Fragment>
      <Map navigation={navigation} />
    </React.Fragment>
  );
};
