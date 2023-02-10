import React from "react";
import { ScrollView } from "react-native";
import UserSearchBar from "../../components/search_section/search/UserSearchBar";
export default function SearchHome({ navigation }) {
  return (
    <ScrollView style={{ backgroundColor: "white" }} nestedScrollEnabled={true}>
      <UserSearchBar navigation={navigation}></UserSearchBar>
    </ScrollView>
  );
}
