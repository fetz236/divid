import { View, Text } from "react-native";
import React from "react";
import { refer_user_style } from "../../styles/userDetail/ReferUserStyle";

//Referring a user display screen
export default function ReferUser() {
  return (
    <View style={refer_user_style.main_container}>
      <View>
        <Text style={refer_user_style.title}>
          You can refer a user using this code
        </Text>
      </View>
      <View style={refer_user_style.body_container}>
        <Text style={refer_user_style.sub_heading}>
          Here is the unique code unique to your account. Once a user sign ups
          and books a course or a worker, you will receive the referral amount
          as credit to your account
        </Text>
      </View>
      <View style={refer_user_style.referral_code_container}>
        <Text style={refer_user_style.referral_text}>ABC123</Text>
      </View>
    </View>
  );
}
