import React from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import Upcoming from "../../components/upcoming/Upcoming";

export default function UpcomingHome({ navigation, route }) {
  return (
    <ScrollView>
      <SafeAreaView>
        <Upcoming navigation={navigation} route={route} />
      </SafeAreaView>
    </ScrollView>
  );
}
