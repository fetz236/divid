import { View, Text } from "react-native";
import React, { useState } from "react";
import { Divider } from "react-native-elements";
import { view_perks_style } from "../../styles/checkout/ViewPerksStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ViewPerks() {
  const perks = [
    {
      name: "Towel",
      icon_name: "",
      quantity: 0,
    },
    {
      name: "Sauna Pass",
      icon_name: "",
      quantity: 0,
    },
  ];

  const [quantity, setQuantity] = useState(0);

  const handleIncrements = (up) => {
    if (up == true) {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity - 1);
    }
  };
  return (
    <SafeAreaView>
      <PerksHeader />
      <Divider style={view_perks_style.divider} />
      {perks.map((perk, index) => (
        <View key={index} style={view_perks_style.perk_container}>
          <PerksInformation perk={perk} />
          <QuantityManager
            perk={perk}
            quantity={quantity}
            handleIncrements={handleIncrements}
          />
        </View>
      ))}
    </SafeAreaView>
  );
}

const PerksHeader = () => (
  <View style={view_perks_style.header_container}>
    <View style={{ marginLeft: "2%" }}>
      <MaterialCommunityIcons
        name="arrow-left"
        size={30}
      ></MaterialCommunityIcons>
    </View>
    <View style={{ marginLeft: "auto", marginRight: "auto" }}>
      <Text style={view_perks_style.title}>Add Perks</Text>
    </View>
    <View style={{ marginLeft: "2%" }}>
      <MaterialCommunityIcons
        name="arrow-left"
        size={30}
        color={"transparent"}
      ></MaterialCommunityIcons>
    </View>
  </View>
);

const PerksInformation = (props) => (
  <View style={view_perks_style.perk_info}>
    <Text style={view_perks_style.sub_heading}> {props.perk.name}</Text>
  </View>
);

const QuantityManager = (props) => (
  <View style={view_perks_style.main_buttons}>
    <TouchableOpacity
      style={view_perks_style.button_container}
      onPress={() => {
        props.handleIncrements(true);
      }}
    >
      <Text style={view_perks_style.sub_heading_white}>+</Text>
    </TouchableOpacity>
    <View style={view_perks_style.quantity_container}>
      <Text>{props.quantity}</Text>
    </View>
    <TouchableOpacity
      style={view_perks_style.button_container}
      onPress={() => {
        props.handleIncrements(false);
      }}
    >
      <Text style={view_perks_style.sub_heading_white}>-</Text>
    </TouchableOpacity>
  </View>
);
