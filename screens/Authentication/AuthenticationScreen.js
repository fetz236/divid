import React from "react";
import { ScrollView } from "react-native";
import AuthenticationHome from "../../components/authentication/AuthenticationHome";

export default function AuthenticationScreen({ route, navigation }) {
  return (
    <ScrollView>
      <AuthenticationHome route={route} navigation={navigation} />
    </ScrollView>
  );
}
