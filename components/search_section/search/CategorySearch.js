import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageBackground } from "react-native";
import { View, Text } from "react-native";
import { category_search_bar_css } from "../../../styles/SearchHome/UserSearchBar/CategorySearch";

export default function CategorySearch({ navigation }) {
  const category_data = require("../../../categories.json");

  return (
    <View style={category_search_bar_css.main_container}>
      <View style={category_search_bar_css.item_container}>
        {category_data.map((item, index) => {
          if (index % 3 == 0 && index + 1 < category_data.length) {
            index += 1;
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  marginTop: "3%",
                  marginBottom: "3%",
                  marginLeft: "3%",
                  marginRight: "3%",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DisplayCategoriesScreen", item)
                  }
                  style={{ marginRight: "3%" }}
                >
                  <View
                    key={index}
                    style={category_search_bar_css.row_container}
                  >
                    <ImageBackground
                      imageStyle={{ opacity: 0.3, borderRadius: 20 }}
                      style={category_search_bar_css.category_image}
                      source={{ uri: item.image_url }}
                    >
                      <Text style={category_search_bar_css.category_text}>
                        {" "}
                        {item.name.toUpperCase()}
                      </Text>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      "DisplayCategoriesScreen",
                      category_data[index]
                    )
                  }
                >
                  <View
                    key={index + 1}
                    style={category_search_bar_css.row_container}
                  >
                    <ImageBackground
                      imageStyle={{ opacity: 0.3, borderRadius: 20 }}
                      style={category_search_bar_css.category_image_portrait}
                      source={{ uri: category_data[index].image_url }}
                    >
                      <Text
                        style={category_search_bar_css.category_text_portrait}
                      >
                        {" "}
                        {category_data[index].name.toUpperCase()}
                      </Text>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              </View>
            );
          } else if (index % 3 == 2) {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  marginLeft: "3%",
                  marginRight: "3%",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DisplayCategoriesScreen", item)
                  }
                >
                  <View
                    key={index}
                    style={category_search_bar_css.row_container_landscape}
                  >
                    <ImageBackground
                      imageStyle={{ opacity: 0.3, borderRadius: 20 }}
                      style={category_search_bar_css.category_image_landscape}
                      source={{ uri: item.image_url }}
                    >
                      <Text
                        style={category_search_bar_css.category_text_landscape}
                      >
                        {" "}
                        {item.name.toUpperCase()}
                      </Text>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              </View>
            );
          } else if (index % 3 == 0 && index + 1 >= category_data.length) {
            return (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  marginTop: "3%",
                  marginBottom: "3%",
                  marginLeft: "3%",
                  marginRight: "3%",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("DisplayCategoriesScreen", item)
                  }
                  style={{ marginRight: "3%" }}
                >
                  <View
                    key={index}
                    style={category_search_bar_css.row_container}
                  >
                    <ImageBackground
                      imageStyle={{ opacity: 0.3, borderRadius: 20 }}
                      style={category_search_bar_css.category_image}
                      source={{ uri: item.image_url }}
                    >
                      <Text style={category_search_bar_css.category_text}>
                        {" "}
                        {item.name.toUpperCase()}
                      </Text>
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
}
