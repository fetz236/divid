import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { TextInput } from "react-native";
import { View, Text } from "react-native";
import { Divider } from "react-native-elements";
import { fp_style } from "../../styles/authentication/ForgotPassword";
import Icon from "react-native-vector-icons/Ionicons";
import { auth } from "../../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

/*
This is the forgot password screen for the authentication page
This works by:
1) Retrieving all params from the login screen 
2) Passing the isCheckout paramter which tells the navigator to take the user to the checkout
or the user information screen
3) Replacing the stack instead of navigating

*/

export default function ForgotPassword({ navigation, ...props }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  //Using firebase auth, are able to send a password reset email
  //This screen is rendered by Google and no necessary coding is required to handle the changing of a password
  //Once the user submits the form, their password will update on Firebase Auth
  const handleForgotPass = async () => {
    setLoading(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Email has been sent");
      })
      .catch((error) => {
        alert(error);
      });

    setLoading(false);
  };

  return (
    <SafeAreaView>
      <Icon
        name="close"
        color="#d95a00"
        size={50}
        style={fp_style.close_button}
        onPress={() => navigation.goBack()}
      />
      <View style={fp_style.header_container}>
        <Text style={fp_style.title}>divid</Text>
      </View>
      <Divider style={fp_style.divider} />
      <View style={fp_style.fp_container}>
        <Text style={fp_style.sub_heading}> email </Text>
        <View style={fp_style.input_container}>
          <TextInput
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="emailAddress"
            autoComplete="email"
            onChangeText={(text) => setEmail(text)}
            style={fp_style.ti_container}
            underlineColorAndroid="transparent"
          ></TextInput>
        </View>
      </View>
      <View style={fp_style.forgot_container}>
        <TouchableOpacity
          onPress={() => navigation.replace("LoginScreen", props.route.params)}
        >
          <Text style={fp_style.sub_heading}>
            {" "}
            actually i remembered my password{" "}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={fp_style.forgot_container_box}>
        <TouchableOpacity
          style={fp_style.touchable_opacity}
          onPress={() => handleForgotPass()}
        >
          <Text style={fp_style.sub_heading_white}> send reset email </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
