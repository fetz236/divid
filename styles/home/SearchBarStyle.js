import { Dimensions, StyleSheet } from "react-native";

export const search_bar_css = StyleSheet.create({
  search_bar_container: {
    marginTop: "1%",
    flexDirection: "row",
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d95a00",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    marginRight: "1%",
    color: "#d95a00",
    height: Dimensions.get("screen").height / 18,
  },
  change_address: {
    flexDirection: "row",
    backgroundColor: "#d95a00",
    padding: 9,
    borderRadius: 30,
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 20,
    fontWeight: "700",
    color: "#d95a00",
  },
  location_button: {
    marginLeft: 10,
  },
  textInputContainer: {
    width: "61%",
    flexDirection: "row",
    marginLeft: "2%",
  },
});
