import React, { useState } from "react";
import { View, Text } from "react-native";
import { CheckBox, Divider } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { cancel_pb_style } from "../../styles/upcoming/CancelPendingBookingHomeStyle";

export default function CancelPendingBookingHome({ navigation, ...props }) {
  const [accepted, setAccepted] = useState(false);
  const booking = props.route.params.booking;
  const handleCancellation = () => {
    console.log("Cancelllleedd");
  };

  return (
    <View>
      <AcceptTerms
        setAccepted={setAccepted}
        accepted={accepted}
        booking={booking}
      />
      <Divider style={cancel_pb_style.divider} />
      <ConfirmCancellation
        navigation={navigation}
        handleCancellation={handleCancellation}
        booking={booking}
      />
    </View>
  );
}

const AcceptTerms = (props) => (
  <View style={cancel_pb_style.accept_terms}>
    <View style={cancel_pb_style.confirm_container}>
      <Text style={cancel_pb_style.sub_heading}>
        You will not be charged a fee because of the pending booking status for{" "}
      </Text>
      <CheckBox
        style={{
          color: "#d95a00",
        }}
        checkedColor={{
          color: "#d95a00",
        }}
        containerStyle={{
          backgroundColor: "transparent",
          borderWidth: 0,
          color: "#d95a00",
        }}
        textStyle={{ color: "#d95a00" }}
        title={"Accept Terms"}
        checked={props.accepted}
        onPress={() => props.setAccepted(!props.accepted)}
      ></CheckBox>
    </View>
  </View>
);
const ConfirmCancellation = (props) => (
  <View style={cancel_pb_style.confirm_cancellation}>
    <View style={cancel_pb_style.confirm_container}>
      <Text style={cancel_pb_style.title}>Confirm Cancellation</Text>
    </View>
    <View style={cancel_pb_style.all_buttons}>
      <TouchableOpacity
        style={cancel_pb_style.button_container}
        onPress={props.handleCancellation}
      >
        <Text style={cancel_pb_style.button_text}>Go Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={cancel_pb_style.button_container}
        onPress={props.handleCancellation}
      >
        <Text style={cancel_pb_style.button_text}>Confirm</Text>
      </TouchableOpacity>
    </View>
  </View>
);
