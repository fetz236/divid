import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { View, Text } from "react-native";
import { signup_style } from "../../styles/authentication/SignUpStyle";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import MultiSelect from "react-native-multiple-select";
import PhoneInput from "react-native-phone-number-input";

const categories = require("../../categories.json");

/*
    The Sign Up Page :D 
    The most compelx part of our Authentication stack...

    Here we create users using Firebase Auth and we are able to easily add users to our database. Furthermore, 
    we are able to update the Firestore DB easily using the auth uid as our doc id
    
    Thus, making it easier to access users' extra data such as their favourites, profile picture and more.
*/

export default function SignUp({ navigation, ...props }) {
  //Declaring Variables to set the data the user declared
  // Declaring state variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileCountry, setMobileCountry] = useState("GB");
  const [mobileCountryCode, setMobileCountryCode] = useState("44");
  const [password, setPassword] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  // Signup handler function
  const handleSignUp = async () => {
    try {
      const userCredentials = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredentials.user;
      const id = user.uid;

      await setDoc(doc(db, "users", id), {
        categories: selectedItems,
        email: email,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        mobile: mobile,
        mobileCountry: mobileCountry,
        mobileCountryCode: mobileCountryCode,
        rating: 5,
        referralCode: generateReferralCode(firstName, lastName),
        reviews: 1,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/divid-edf5d.appspot.com/o/profile_images%2Fuser.png?alt=media&token=0dc2498c-bc30-4f8d-a663-9b8d6fbfa127",
      });

      await user.updateProfile({
        displayName: `${firstName.trim()} ${lastName.trim()}`,
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/divid-edf5d.appspot.com/o/profile_images%2Fuser.png?alt=media&token=0dc2498c-bc30-4f8d-a663-9b8d6fbfa127",
      });

      if (props.route.params.isCheckout) {
        navigation.replace("Checkout", props.route.params);
      } else {
        navigation.replace("UserDetail");
      }
    } catch (error) {
      alert(`${error.code}: ${error.message}`);
    }
  };

  // Referral code generator function
  const generateReferralCode = (firstName, lastName) => {
    let refCode = "";
    refCode += firstName.substring(0, 3);
    refCode += lastName.substring(0, 3);
    refCode += Math.floor(Math.random() * 10000);
    return refCode;
  };

  // Update selected items
  const onSelectedItemsChanged = (selected) => {
    setSelectedItems(selected);
  };

  return (
    <SafeAreaView>
      <Icon
        name="close"
        color="#d95a00"
        size={50}
        style={signup_style.close_button}
        onPress={() => navigation.goBack()}
      />
      <View style={signup_style.header_container}>
        <Text style={signup_style.title}> divid </Text>
      </View>
      <Divider style={signup_style.divider} />
      <FirstName setFirstName={setFirstName} />
      <LastName setLastName={setLastName} />
      <Mobile
        setMobile={setMobile}
        setMobileCountry={setMobileCountry}
        setMobileCountryCode={setMobileCountryCode}
      />
      <Email setEmail={setEmail} />
      <Password setPassword={setPassword} />
      <Interests
        selectedItems={selectedItems}
        onSelectedItemsChanged={onSelectedItemsChanged}
      />
      <View style={signup_style.forgot_container}>
        <TouchableOpacity
          onPress={() =>
            navigation.replace("LoginScreen", {
              navigation: navigation,
            })
          }
        >
          <Text style={signup_style.sub_heading}>
            {" "}
            i actually have an account{" "}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={signup_style.forgot_container_box}>
        <TouchableOpacity
          style={signup_style.touchable_opacity}
          onPress={() => handleSignUp()}
        >
          <Text style={signup_style.sub_heading_white}>
            {" "}
            make me an account{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const FirstName = (props) => (
  <View style={signup_style.signup_container}>
    <Text style={signup_style.sub_heading}> first name</Text>
    <View style={signup_style.input_container}>
      <TextInput
        autoCorrect={false}
        textContentType="givenName"
        autoComplete="name-given"
        style={signup_style.ti_container}
        onChangeText={(text) => props.setFirstName(text)}
        underlineColorAndroid="transparent"
      ></TextInput>
    </View>
  </View>
);

const LastName = (props) => (
  <View style={signup_style.signup_container}>
    <Text style={signup_style.sub_heading}> last name</Text>
    <View style={signup_style.input_container}>
      <TextInput
        autoCorrect={false}
        textContentType="familyName"
        autoComplete="name-family"
        style={signup_style.ti_container}
        onChangeText={(text) => props.setLastName(text)}
        underlineColorAndroid="transparent"
      ></TextInput>
    </View>
  </View>
);

const Email = (props) => (
  <View style={signup_style.signup_container}>
    <Text style={signup_style.sub_heading}> email </Text>
    <View style={signup_style.input_container}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        textContentType="emailAddress"
        autoComplete="email"
        style={signup_style.ti_container}
        onChangeText={(text) => props.setEmail(text)}
        underlineColorAndroid="transparent"
      ></TextInput>
    </View>
  </View>
);

const Mobile = (props) => (
  <View style={signup_style.signup_container}>
    <Text style={signup_style.sub_heading}> mobile </Text>
    <View>
      <View style={signup_style.input_container}>
        <PhoneInput
          defaultCode="GB"
          onChangeCountry={(text) => {
            props.setMobileCountryCode(text.callingCode[0]);
            props.setMobileCountry(text.cca2);
          }}
          onChangeText={(text) => props.setMobile(text)}
          containerStyle={{
            backgroundColor: "transparent",
          }}
          codeTextStyle={{
            backgroundColor: "transparent",
          }}
          textContainerStyle={{
            backgroundColor: "transparent",
          }}
        />
      </View>
    </View>
  </View>
);

const Password = (props) => (
  <View style={signup_style.signup_container}>
    <Text style={signup_style.sub_heading}> password </Text>
    <View style={signup_style.input_container}>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        textContentType="newPassword"
        autoComplete="password-new"
        secureTextEntry={true}
        style={signup_style.ti_container}
        onChangeText={(text) => props.setPassword(text)}
        underlineColorAndroid="transparent"
      ></TextInput>
    </View>
  </View>
);

const Interests = (props) => (
  <View style={signup_style.signup_container}>
    <Text style={signup_style.sub_heading}> interests </Text>
    <View style={signup_style.multi_input_container}>
      <MultiSelect
        items={categories}
        uniqueKey="__id__"
        onSelectedItemsChange={props.onSelectedItemsChanged}
        selectedItems={props.selectedItems}
        selectText="Pick categories"
        searchInputPlaceholderText="Search Categories"
        tagRemoveIconColor="#d95a00"
        searchInputStyle={{
          height: 50,
          width: "80%",
          backgroundColor: "transparent",
        }}
        styleDropdownMenu={{
          height: 50,
          backgroundColor: "transparent",
          borderColor: "#d95a00",
          borderRadius: 20,
          borderWidth: 1,
        }}
        styleDropdownMenuSubsection={{
          backgroundColor: "transparent",
          borderColor: "#d95a00",
          marginLeft: "3%",
          marginRight: "3%",
          borderBottomColor: "transparent",
        }}
        styleIndicator={{
          backgroundColor: "transparent",
        }}
        styleInputGroup={{
          backgroundColor: "transparent",
          borderColor: "#d95a00",
          borderRadius: 20,
          borderWidth: 1,
        }}
        styleItemsContainer={{
          backgroundColor: "transparent",
        }}
        styleListContainer={{
          backgroundColor: "transparent",
        }}
        styleMainWrapper={{
          backgroundColor: "transparent",
        }}
        styleRowList={{
          backgroundColor: "transparent",
        }}
        styleSelectorContainer={{
          backgroundColor: "transparent",
        }}
        styleTextDropdown={{
          backgroundColor: "transparent",
        }}
        styleTextDropdownSelected={{
          backgroundColor: "transparent",
        }}
        tagBorderColor="#d95a00"
        tagTextColor="#d95a00"
        selectedItemIconColor="#d95a00"
        selectedItemTextColor="#d95a00"
        itemTextColor="#d95a00"
        displayKey="name"
        submitButtonColor="#d95a00"
        submitButtonText="Submit"
        removeSelected
      />
    </View>
  </View>
);
