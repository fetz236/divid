import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import GeneralInfo from "../../components/workers/GeneralInfo";
import WorkerItems from "../../components/workers/WorkerItems";

/*

This is the home page for all workers that will be present in the databse

*/
export default function WorkerHome({ route, navigation }) {
  const [current_address, setCurrentAddress] = useState({
    address1: "30 Aldwych",
    address2: "",
    addressPostal: "WC2B 4BG",
    location: { latitude: 51.513187, longitude: -0.117499 },
  });
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <View style={{ backgroundColor: "white" }}>
          <GeneralInfo
            navigation={navigation}
            current_address={current_address}
            setCurrentAddress={setCurrentAddress}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <WorkerItems
            navigation={navigation}
            current_address={current_address}
            setCurrentAddress={setCurrentAddress}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
