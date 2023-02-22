import React from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import CancelPendingBooking from "../../components/upcoming/CancelPendingBooking";

export default function Cancel() {
  return (
    <ScrollView>
      <SafeAreaView>
        <CancelPendingBooking />
      </SafeAreaView>
    </ScrollView>
  );
}
