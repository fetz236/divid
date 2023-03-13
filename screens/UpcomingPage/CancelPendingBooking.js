import React from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import CancelPendingBookingHome from "../../components/upcoming/CancelPendingBookingHome";

export default function CancelPendingBooking({ navigation, route }) {
  return (
    <ScrollView>
      <SafeAreaView>
        <CancelPendingBookingHome navigation={navigation} route={route} />
      </SafeAreaView>
    </ScrollView>
  );
}
