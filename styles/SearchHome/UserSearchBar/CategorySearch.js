import { StyleSheet } from "react-native";

export const category_search_bar_css = StyleSheet.create({
  main_container: {
    marginTop: "2%",
  },
  item_container: {
    flexDirection: "column",
  },
  row_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  category_text: {
    fontSize: 20,
    color: "#d95a00",
    marginTop: "37.5%",
    fontWeight: "600",
  },
  category_image: {
    height: 220,
    width: 250,
    alignItems: "center",
  },
  category_image_portrait: {
    height: 220,
    width: 130,
    alignItems: "center",
  },
  category_text_portrait: {
    fontSize: 20,
    color: "#d95a00",
    marginTop: "70%",
    fontWeight: "600",
  },
  category_text_landscape: {
    fontSize: 20,
    color: "#d95a00",
    marginTop: "25%",
    fontWeight: "600",
  },
  category_image_landscape: {
    height: 220,
    width: "100%",
    alignItems: "center",
  },
  row_container_landscape: {
    flexDirection: "row",
    alignItems: "center",
  },
});
