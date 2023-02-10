import { StyleSheet } from "react-native";

export const user_search_bar_css = StyleSheet.create({
  main_container: {
    marginTop: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  search_bar_container: {
    flexDirection: "row",
    marginLeft: "5%",
    marginRight: "5%",
    backgroundColor: "white",
    height: 65,
    width: "80%",
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#d95a00",
    alignItems: "center",
  },
  input_container: {
    height: "95%",
    width: "85%",
    marginTop: "2.5%",
    marginBottom: "2.5%",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    fontSize: 16,
  },
  search_icon: {
    marginLeft: "2.5%",
  },
  flat_list_container: {
    marginTop: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  flat_list: {
    marginTop: "2%",
  },
  flat_list_heading: {
    color: "#d95a00",
    fontSize: 16,
    marginTop: "10%",
    fontWeight: "600",
  },
  flat_list_text: {
    color: "#8d8d8d",
    marginTop: "5%",
    fontSize: 16,
  },
});
