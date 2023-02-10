import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import { View, Text } from "react-native";
import { change_payment_css } from "../../styles/checkout/ChangePaymentStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput } from "react-native";
import { AddToWalletButton } from "@stripe/stripe-react-native";

//Existing cards template that needs to be better improved on
const existing_cards = [
  {
    name: "Stefanos Karathanassis",
    card_type: "Visa",
    card_number: "****1234",
    card_expiry_date: "09/2021",
    cvv: "123",
  },
  {
    name: "Stefanos Karathanassis",
    card_type: "Mastercard",
    card_number: "****1235",
    card_expiry_date: "09/2021",
    cvv: "123",
  },
  {
    name: "Stefanos Karathanassis",
    card_type: "Mastercard",
    card_number: "****1236",
    card_expiry_date: "02/2025",
    cvv: "123",
  },
];
export default function ChangePayment() {
  const [today, setToday] = useState(new Date());
  const [addNew, setAddNew] = useState(false);

  const saveData = () => {
    console.log("Save Data");
  };
  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <View style={change_payment_css.existing_container}>
            <View style={change_payment_css.existing_header}>
              <Text style={change_payment_css.existing_header}>
                Existing Cards
              </Text>
              {existing_cards.map((card, index) => (
                <View key={index} style={change_payment_css.existing_main}>
                  <ExistingCards card={card} />
                </View>
              ))}
            </View>
          </View>
          <AddCard addNew={addNew} setAddNew={setAddNew} saveData={saveData} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const ExistingCards = (props) => (
  <TouchableOpacity style={change_payment_css.card_container}>
    <View style={change_payment_css.card_box}>
      <MaterialCommunityIcons name="credit-card-check-outline" size={30} />
      <Text style={change_payment_css.existing_text}>
        {" "}
        {props.card.card_number}{" "}
      </Text>
    </View>
    <View style={change_payment_css.card_column_box}>
      <ExpiryDate />
    </View>
  </TouchableOpacity>
);

const ExpiryDate = (props) => (
  <View style={change_payment_css.expiry_container}>
    <Text style={change_payment_css.expiry_text}> Card Expired</Text>
  </View>
);

const AddCard = (props) => (
  <View style={change_payment_css.add_container}>
    <View style={change_payment_css.add_header}>
      <Text style={change_payment_css.add_header}>Add New Card</Text>
      <TouchableOpacity
        style={change_payment_css.add_info}
        onPress={() => props.setAddNew(!props.addNew)}
      >
        <View style={change_payment_css.add_button}>
          <MaterialCommunityIcons
            name={props.addNew ? "minus" : "plus"}
            size={35}
            color={"#d95a00"}
          />
        </View>
      </TouchableOpacity>
    </View>

    {props.addNew && <NewCard />}

    <TouchableOpacity
      style={change_payment_css.save_info}
      onPress={() => props.saveData()}
    >
      <View style={change_payment_css.save_button}>
        <Text style={change_payment_css.save_text}>Save Data</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const NewCard = () => (
  <View style={change_payment_css.new_card_form}>
    <View style={change_payment_css.input_container}>
      <TextInput
        placeholder="Name"
        placeholderTextColor={"#d95a00"}
        textContentType={"name"}
        autoComplete={"name"}
        style={change_payment_css.ti_container}
      />
    </View>
    <View style={change_payment_css.input_container}>
      <TextInput
        placeholder="Card Number"
        placeholderTextColor={"#d95a00"}
        textContentType={"creditCardNumber"}
        autoComplete={"cc-number"}
        style={change_payment_css.ti_container}
      />
    </View>
    <View style={change_payment_css.small_containers}>
      <View style={change_payment_css.small_input_container}>
        <TextInput
          placeholder="Expiry date"
          placeholderTextColor={"#d95a00"}
          autoComplete={"cc-exp"}
          style={change_payment_css.small_ti_container}
        />
      </View>
      <View style={change_payment_css.small_input_container}>
        <TextInput
          placeholder="CVV"
          placeholderTextColor={"#d95a00"}
          maxLength={3}
          keyboardType={"number-pad"}
          style={change_payment_css.small_ti_container}
        />
      </View>
    </View>
    <AddToWalletButton
      testEnv={true}
      iOSButtonStyle="onLightBackground"
      cardDetails={{
        primaryAccountIdentifier: "V-123",
        name: "David Wallace",
        lastFour: "4242",
      }}
      ephemeralKey={"123"} // This object is retrieved from your server. See https://stripe.com/docs/issuing/cards/digital-wallets?platform=react-native#update-your-backend
      onComplete={(error) => {
        Alert.alert(
          error ? error.code : "Success",
          error ? error.message : "Card was successfully added to the wallet."
        );
      }}
    />
  </View>
);
