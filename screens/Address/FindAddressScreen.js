import { View } from "react-native";
import React from "react";
import FindAddress from "../../components/address/FindAddress";

export default function FindAddressScreen({ navigation, route }) {
  return (
    <View>
      <FindAddress navigation={navigation} route={route} />
    </View>
  );
}
