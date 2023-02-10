import { StyleSheet } from "react-native";

export const user_css = StyleSheet.create({
  main_container: {
    marginBottom: "10%",
  },
  user_header: {
    fontWeight: "bold",
    marginTop: "5%",
    fontSize: 20,
    color: "#d95a00",
  },
  user_sub_heading: {
    fontWeight: "400",
    fontSize: 16,
    color: "#8d8d8d",
    marginLeft: "2%",
    marginTop: "2%",
    marginBottom: "2%",
  },
  name_container: {
    alignItems: "center",
  },
  review_container: {
    alignItems: "center",
    justifyContent: "center",
  },
  user_image: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    borderWidth: 3,
    borderColor: "#d95a00",
    overflow: "hidden",
    alignSelf: "center",
    marginTop: "10%",
  },
  diplay_settings: {
    marginLeft: "2%",
    marginRight: "2%",
    marginTop: "2%",
    marginBottom: "2%",
    borderBottomWidth: 2,
    borderColor: "#8d8d8d",
    flexDirection: "row",
  },
  display_settings_text: {
    color: "#8d8d8d",
    fontSize: 24,
    fontWeight: "600",
  },
  arrow: {
    marginLeft: "auto",
    color: "#8d8d8d",
    fontSize: 24,
    fontWeight: "600",
  },
  checkmark: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: "5%",
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "#d95a00",
    backgroundColor: "#d95a00",
  },
  check_box: {
    marginLeft: "2%",
    marginRight: "2%",
    marginTop: "2%",
    marginBottom: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
});
