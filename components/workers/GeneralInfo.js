import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image } from "react-native";
import { View } from "react-native";
import { general_info_css } from "../../styles/workers/GeneralInfoStyle";
import Icon from "react-native-vector-icons/Ionicons";
import { auth } from "../../firebase";

const logo = { image: require("../../assets/divid.png") };

export default function GeneralInfo({ navigation, ...props }) {
  //Checks authentication for to see which Screen the user should be guided to during Login
  const checkAuthentication = () => {
    if (auth.currentUser) {
      navigation.navigate("UserDetail");
    } else {
      navigation.navigate("AuthenticationScreen", {
        isCheckout: false,
      });
    }
  };

  return (
    <View source={general_info_css.gi_container}>
      <Logo />
      <View style={general_info_css.profile_container}>
        <TouchableOpacity onPress={() => checkAuthentication()}>
          <Icon name="person-outline" size={35} color="#d95a00"></Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Logo = () => (
  <View style={general_info_css.logo_container}>
    <Image source={logo.image} style={general_info_css.logo_def} />
  </View>
);
