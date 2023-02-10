import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import AccountDetails from "../../components/userDetail/AccountDetails";

export default function AccountDetailsScreen({ route, navigation }) {
  return (
    <ScrollView>
      <AccountDetails navigation={navigation} route={route} />
    </ScrollView>
  );
}
