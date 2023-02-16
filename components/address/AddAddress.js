import { View, Text } from "react-native";
import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { add_address_style } from "../../styles/address/AddAddressStyle";
import { auth, db } from "../../firebase";

export default function AddAddress({ navigation, ...props }) {
  const [address1, setAddress1] = useState(props.route.params.address1);
  const [address2, setAddress2] = useState(props.route.params.address2);
  const [addressCity, setAddressCity] = useState(
    props.route.params.addressCity
  );
  const [addressState, setAddressState] = useState(
    props.route.params.addressState
  );
  const [addressCountry, setAddressCountry] = useState(
    props.route.params.addressCountry
  );
  const [addressPostal, setAddressPostal] = useState(
    props.route.params.addressPostal
  );

  //function to add new address to the user's collection of addresses

  function setAddressToFalse() {
    return db
      .collection(`users/${auth.currentUser.uid}/address`)
      .where("isActive", "==", true)
      .get()
      .then((snapshot) => {
        if (snapshot.size > 0) {
          snapshot.forEach((doc) => {
            const docRef = db
              .collection(`users/${auth.currentUser.uid}/address`)
              .doc(doc.id);
            docRef
              .update({
                isActive: false,
              })
              .catch((error) => {
                console.error("Error updating address: ", error);
              });
          });
        }
      })
      .catch((error) => {
        alert(`Error found: ${error}! Please contact support`);
      });
  }

  function uploadNewAddress() {
    return db
      .collection(`users/${auth.currentUser.uid}/address`)
      .add({
        address1: address1,
        address2: address2,
        city: addressCity,
        state: addressState,
        country: addressCountry,
        postcode: addressPostal,
        isActive: true,
      })
      .catch((error) => {
        alert(`Error found: ${error}! Please contact support`);
      });
  }
  const addNewAddress = () => {
    //Adds to the address to the current users address collection
    setAddressToFalse().then(() => {
      return uploadNewAddress();
    });
    //Pops the whole modal once the address is added
    navigation.pop(2);
  };
  return (
    <View style={add_address_style.main_container}>
      <View style={add_address_style.header}>
        <MaterialCommunityIcons
          name="arrow-left"
          color="#d95a00"
          size={35}
          style={add_address_style.back_button}
          onPress={() => navigation.goBack()}
        />
        <MaterialCommunityIcons
          name="close"
          color="#d95a00"
          size={50}
          style={add_address_style.close_button}
          onPress={() => navigation.pop(2)}
        />
      </View>

      <View>
        <Address1 address1={address1} setAddress1={setAddress1} />
        <Address2 address2={address2} setAddress2={setAddress2} />
        <AddressCity
          addressCity={addressCity}
          setAddressCity={setAddressCity}
        />
        <AddressState
          addressState={addressState}
          setAddressState={setAddressState}
        />
        <AddressCountry
          addressCountry={addressCountry}
          setAddressCountry={setAddressCountry}
        />
        <AddressPostal
          addressPostal={addressPostal}
          setAddressPostal={setAddressPostal}
        />
      </View>
      <CompleteAddress addNewAddress={addNewAddress} />
    </View>
  );
}

const Address1 = (props) => (
  <View style={add_address_style.signup_container}>
    <Text style={add_address_style.sub_heading}> Address Line 1</Text>
    <View style={add_address_style.input_container}>
      <TextInput
        autoCorrect={false}
        defaultValue={props.address1}
        textContentType="streetAddressLine1"
        autoComplete="postal-address"
        style={add_address_style.ti_container}
        onChangeText={(text) => props.setAddress1(text)}
        underlineColorAndroid="transparent"
      ></TextInput>
    </View>
  </View>
);

const Address2 = (props) => (
  <View style={add_address_style.signup_container}>
    <Text style={add_address_style.sub_heading}> Address Line 2</Text>
    <View style={add_address_style.input_container}>
      <TextInput
        autoCorrect={false}
        defaultValue={props.address2}
        textContentType="streetAddressLine2"
        autoComplete="postal-address-extended"
        style={add_address_style.ti_container}
        onChangeText={(text) => props.setAddress2(text)}
        underlineColorAndroid="transparent"
      ></TextInput>
    </View>
  </View>
);

const AddressCity = (props) => (
  <View style={add_address_style.signup_container}>
    <Text style={add_address_style.sub_heading}> city name</Text>
    <View style={add_address_style.input_container}>
      <TextInput
        autoCorrect={false}
        defaultValue={props.addressCity}
        textContentType="addressCity"
        autoComplete="postal-address-locality"
        style={add_address_style.ti_container}
        onChangeText={(text) => props.setAddressCity(text)}
        underlineColorAndroid="transparent"
      ></TextInput>
    </View>
  </View>
);

const AddressState = (props) => (
  <View style={add_address_style.signup_container}>
    <Text style={add_address_style.sub_heading}> state name</Text>
    <View style={add_address_style.input_container}>
      <TextInput
        autoCorrect={false}
        defaultValue={props.addressState}
        textContentType="addressState"
        autoComplete="postal-address-region"
        style={add_address_style.ti_container}
        onChangeText={(text) => props.setAddressState(text)}
        underlineColorAndroid="transparent"
      ></TextInput>
    </View>
  </View>
);

const AddressCountry = (props) => (
  <View style={add_address_style.signup_container}>
    <Text style={add_address_style.sub_heading}> country name</Text>
    <View style={add_address_style.input_container}>
      <TextInput
        autoCorrect={false}
        defaultValue={props.addressCountry}
        textContentType="addressCountry"
        autoComplete="postal-address-country"
        style={add_address_style.ti_container}
        onChangeText={(text) => props.setAddressCountry(text)}
        underlineColorAndroid="transparent"
      ></TextInput>
    </View>
  </View>
);

const AddressPostal = (props) => (
  <View style={add_address_style.signup_container}>
    <Text style={add_address_style.sub_heading}> postal code</Text>
    <View style={add_address_style.input_container}>
      <TextInput
        autoCorrect={false}
        defaultValue={props.addressPostal}
        textContentType="postalCode"
        autoComplete="postal-code"
        style={add_address_style.ti_container}
        onChangeText={(text) => props.setAddressPostal(text)}
        underlineColorAndroid="transparent"
      ></TextInput>
    </View>
  </View>
);

const CompleteAddress = (props) => (
  <View style={add_address_style.add_address_container}>
    <TouchableOpacity
      style={add_address_style.touchable_opacity}
      onPress={() => props.addNewAddress()}
    >
      <Text style={add_address_style.sub_heading_white}> add address </Text>
    </TouchableOpacity>
  </View>
);
