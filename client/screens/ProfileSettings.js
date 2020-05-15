import { Text, View } from "react-native";
import React from "react";

export const Settings = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{JSON.stringify(navigation)}</Text>
    </View>
  );
};
