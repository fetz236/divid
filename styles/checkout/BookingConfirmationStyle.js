import { StyleSheet } from "react-native";

export const booking_confirmation_style = StyleSheet.create({
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
    color: "#8d8d8d",
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    marginTop: "2%",
    marginBottom: "2%",
    color: "#a2a2a2",
  },
  information_container: {
    marginTop: "5%",
    marginLeft: "3%",
  },
  information_info: {
    marginTop: "3%",
    marginLeft: "-3%",
    marginBottom: "1%",
    alignItems: "center",
    justifyContent: "center",
  },
  qr_container: {
    marginTop: "20%",
  },
});
