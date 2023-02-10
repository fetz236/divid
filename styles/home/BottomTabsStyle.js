import { StyleSheet } from "react-native";

export const bottom_tabs_css = StyleSheet.create({
  bt_container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 25,
    backgroundColor: "#d95a00",
  },
  item_container: {
    alignItems: "center",
    marginRight: 20,
  },
  image_def: {
    fontSize: 30,
    color: "white",
  },
  text_def: {
    fontSize: 8,
    fontWeight: "400",
    marginTop: 5,
    color: "white",
  },
});
