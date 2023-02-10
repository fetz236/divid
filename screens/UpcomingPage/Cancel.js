import React from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import CancelHome from "../../components/upcoming/CancelHome";

export default function Cancel() {
  return (
    <ScrollView>
      <SafeAreaView>
        <CancelHome />
      </SafeAreaView>
    </ScrollView>
  );
}
