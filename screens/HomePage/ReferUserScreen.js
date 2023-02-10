import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import ReferUser from "../../components/userDetail/ReferUser";

export default function ReferUserScreen({ route, navigation }) {
  return (
    <ScrollView>
      <ReferUser />
    </ScrollView>
  );
}
