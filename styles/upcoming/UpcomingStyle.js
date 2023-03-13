import { Dimensions, StyleSheet } from "react-native";

export const upcoming_style_sheet = StyleSheet.create({
  header_container: {
    alignItems: "center",
    marginTop: "5%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    color: "#d95a00",
    fontSize: 20,
    fontWeight: "600",
  },
  sub_heading: {
    color: "#d95a00",
    fontSize: 20,
    fontWeight: "500",
  },
  sub_heading_button: {
    color: "#d95a00",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  divider: {
    marginTop: "5%",
    marginBottom: "5%",
    color: "#a2a2a2",
  },
  divider_date: {
    marginTop: "3%",
    marginBottom: "3%",
    color: "#a2a2a2",
  },
  main_container: {
    marginTop: "2%",
    marginBottom: "2%",
    marginLeft: "2%",
    marginRight: "2%",
    width: "95%",
    height: Dimensions.get("screen").height / 5,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#d95a00",
  },
  info_container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "4%",
    marginLeft: "4%",
    marginRight: "4%",
    marginBottom: "4%",
    alignItems: "center",
    justifyContent: "center",
  },
  btn_container: {
    marginTop: "10%",
    marginBottom: "2%",
    marginLeft: "2%",
    marginRight: "2%",
    width: "100%",
    height: Dimensions.get("screen").height / 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#d95a00",
    backgroundColor: "#d95a00",
    alignItems: "center",
    justifyContent: "center",
  },
  date_header: {
    marginLeft: "2%",
  },
  btn_text: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  space_text: {
    marginTop: "5%",
  },
  display_buttons: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wrap_text: {
    alignItems: "center",
    justifyContent: "center",
  },
  no_booking_header_container: {
    alignItems: "center",
    marginTop: "60%",
  },
  no_booking_title: {
    color: "#d95a00",
    fontSize: 20,
    fontWeight: "600",
  },
});
