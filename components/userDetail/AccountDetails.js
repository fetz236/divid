import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { account_details_style } from "../../styles/userDetail/AccountDetailsStyle";
import { TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PhoneInput from "react-native-phone-number-input";
import MultiSelect from "react-native-multiple-select";
import { auth, db } from "../../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

const categories = require("../../categories.json");

export default function AccountDetails({ navigation, ...props }) {
  //Loading the users category icons using the categories.json file

  const [category_icons, setCategoryIcons] = useState([]);
  const [categories_loaded, setLoadedCategories] = useState(false);

  useEffect(async () => {
    const getCategories = () => {
      let category_images = [];

      for (let i = 0; i < categories.length; i++) {
        for (
          let j = 0;
          j < props.route.params.user_data.categories.length;
          j++
        ) {
          if (
            categories[i].__id__ == props.route.params.user_data.categories[j]
          ) {
            category_images.push(categories[i].__id__);
          }
        }
      }
      setCategoryIcons(category_images);
    };

    if (category_icons.length == 0) {
      await getCategories();
      setF_name(props.route.params.user_data.first_name);
      setL_name(props.route.params.user_data.last_name);
      setMobile(props.route.params.user_data.mobile);
      setMobileCountry(props.route.params.user_data.mobile_country);
      setLoadedCategories(true);
    }
  }, []);

  // Setting states to retrieve the users information
  const [f_name, setF_name] = useState();
  const [fView, setfView] = useState(false);

  const [l_name, setL_name] = useState();
  const [lView, setlView] = useState(false);

  const [mobile, setMobile] = useState();
  const [mobileCountry, setMobileCountry] = useState("GB");
  const [mobileCountryCallingCode, setMobileCountryCallingCode] =
    useState("44");

  const [mView, setmView] = useState(false);

  const onSelectedItemsChanged = (selected) => {
    setCategoryIcons(selected);
  };

  //Submits relevant changes to firestore
  const handleInfo = async () => {
    await db.collection("users").doc(auth.currentUser.uid).update({
      categories: category_icons,
      first_name: f_name,
      last_name: l_name,
      mobile: mobile,
      mobile_calling_code: mobileCountryCallingCode,
      mobile_country: mobileCountry,
    });
  };

  return (
    <View style={account_details_style.main_container}>
      {categories_loaded && (
        <View>
          <AccountDetailsBody />
          <AccountFirstName
            f_name={f_name}
            setF_name={setF_name}
            fView={fView}
            setfView={setfView}
          />
          <AccountLastName
            l_name={l_name}
            setL_name={setL_name}
            lView={lView}
            setlView={setlView}
          />
          <AccountMobile
            mobile={mobile}
            mobileCountry={mobileCountry}
            setMobile={setMobile}
            mView={mView}
            setmView={setmView}
            setMobileCountry={setMobileCountry}
            setMobileCountryCallingCode={setMobileCountryCallingCode}
          />
          <>
            <AccountInterests
              category_icons={category_icons}
              onSelectedItemsChanged={onSelectedItemsChanged}
            />
          </>
          <View>
            <SubmitInfo handleInfo={handleInfo} />
          </View>
        </View>
      )}
    </View>
  );
}

const AccountDetailsBody = () => (
  <View>
    <View style={account_details_style.body_container}>
      <Text style={account_details_style.title}>General Information</Text>
    </View>
    <View style={account_details_style.body_container}>
      <Text style={account_details_style.sub_heading}>
        You can edit and change any personal information in this section
      </Text>
    </View>
  </View>
);

const AccountFirstName = (props) => (
  <View style={account_details_style.signup_container}>
    <Text style={account_details_style.title}>first name</Text>
    <View style={account_details_style.main_input_container}>
      <View style={account_details_style.input_container}>
        <TextInput
          editable={props.fView}
          defaultValue={props.f_name}
          autoCorrect={false}
          textContentType="givenName"
          autoComplete="name-given"
          style={account_details_style.ti_container}
          onChangeText={(text) => props.setF_name(text)}
          underlineColorAndroid="transparent"
        ></TextInput>
      </View>
      <TouchableOpacity
        style={account_details_style.editable_pencil}
        onPress={() => props.setfView(!props.fView)}
      >
        <MaterialCommunityIcons name="pencil" size={30} color={"white"} />
      </TouchableOpacity>
    </View>
  </View>
);

const AccountLastName = (props) => (
  <View style={account_details_style.signup_container}>
    <Text style={account_details_style.title}>last name</Text>
    <View style={account_details_style.main_input_container}>
      <View style={account_details_style.input_container}>
        <TextInput
          editable={props.lView}
          autoCorrect={false}
          defaultValue={props.l_name}
          textContentType="familyName"
          autoComplete="name-family"
          style={account_details_style.ti_container}
          onChangeText={(text) => props.setL_name(text)}
          underlineColorAndroid="transparent"
        ></TextInput>
      </View>
      <TouchableOpacity
        style={account_details_style.editable_pencil}
        onPress={() => props.setlView(!props.lView)}
      >
        <MaterialCommunityIcons name="pencil" size={30} color={"white"} />
      </TouchableOpacity>
    </View>
  </View>
);

const AccountMobile = (props) => (
  <View style={account_details_style.signup_container}>
    <Text style={account_details_style.title}>mobile </Text>
    <View>
      <View style={account_details_style.main_input_container}>
        <View style={account_details_style.input_container}>
          <PhoneInput
            defaultCode={props.mobileCountry}
            defaultValue={props.mobile}
            disabled={props.mView}
            onChangeCountry={(text) => {
              props.setMobileCountryCallingCode(text.callingCode[0]);
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
        <TouchableOpacity
          style={account_details_style.editable_pencil}
          onPress={() => props.setmView(!props.mView)}
        >
          <MaterialCommunityIcons name="pencil" size={30} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const AccountInterests = (props) => (
  <View style={account_details_style.signup_container}>
    <Text style={account_details_style.mi_sub_heading}> interests </Text>
    <View style={account_details_style.multi_input_container}>
      <MultiSelect
        items={categories}
        uniqueKey="__id__"
        hideTags
        onSelectedItemsChange={props.onSelectedItemsChanged}
        selectedItems={props.category_icons}
        selectText="Pick categories"
        searchInputPlaceholderText="Search Categories"
        tagRemoveIconColor="#d95a00"
        searchInputStyle={{
          height: 60,
          width: "80%",
          backgroundColor: "transparent",
        }}
        styleDropdownMenu={{
          height: 60,
          backgroundColor: "transparent",
          borderColor: "#d95a00",
          borderRadius: 50,
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
          borderRadius: 50,
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
      />
    </View>
  </View>
);

const SubmitInfo = (props) => (
  <View>
    <TouchableOpacity
      style={account_details_style.submit_button}
      onPress={() => props.handleInfo()}
    >
      <Text style={account_details_style.sub_heading_white}> Submit </Text>
    </TouchableOpacity>
  </View>
);
