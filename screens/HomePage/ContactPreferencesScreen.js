import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import ContactPreferences from "../../components/userDetail/ContactPreferences";

export default function ContactPreferencesScreen({ route, navigation }) {
  return (
    <ScrollView>
      <ContactPreferences route={route} navigation={navigation} />
    </ScrollView>
  );
}
