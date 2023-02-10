import { View, Text } from "react-native";
import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import MapView, { Marker } from "react-native-maps";
import { find_address_style } from "../../styles/address/FindAddressStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/*
    This stack acts as a screen to allow users to add addresses.
    It acts as a way similiar to the auth stack

    Uses google maps as it is similar to the search
*/

export default function FindAddress({ navigation, ...props }) {
  const [pin, setPin] = useState({
    latitude: 51.51311959688299,
    longitude: -0.11741839349269867,
  });

  const [region, setRegion] = useState({
    latitude: 51.51311959688299,
    longitude: -0.11741839349269867,
    latitudeDelta: 0.0125,
    longitudeDelta: 0.0125,
  });

  const HERE_API_KEY = "Yiv6QNDU_92QX-BbGXma7OzgZfaPkyXe_4LSg-dJAKY";

  /*
    This function retrieves the address information of a given location using 
    the HERE API. It takes the latitude and longitude from the region object, makes
    a GET request to the API using the fetch API, and extracts the address information from the JSON response. 
    The extracted address information is then passed as an object to the "AddAddressScreen" navigation route. 
    Any errors that occur during the process are logged to the console.
  */

  const handleAddress = async () => {
    console.log(region);
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${region.latitude}%2C${region.longitude}&lang=en-US&apiKey=${HERE_API_KEY}`;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let item_list = data.items;
        console.log(data.items);
        let address = {
          address1: item_list[0].address.houseNumber,
          address2: item_list[0].address.street,
          addressCity: item_list[0].address.city,
          addressState: item_list[0].address.state,
          addressCountry: item_list[0].address.countryName,
          addressPostal: item_list[0].address.postalCode,
        };
        navigation.navigate("AddAddressScreen", address);
      })
      .catch((err) => console.error(err));
  };

  return (
    <View>
      <View>
        <MaterialCommunityIcons
          name="close"
          color="#d95a00"
          size={50}
          style={find_address_style.close_button}
          onPress={() => navigation.goBack()}
        />
        <WorkerLocations
          pin={pin}
          setPin={setPin}
          region={region}
          setRegion={setRegion}
          handleAddress={handleAddress}
        />
        <CompleteAddress handleAddress={handleAddress} />
      </View>
    </View>
  );
}
/*
This is a massive function that contains the rendering of the worker's location
*/

const WorkerLocations = (props) => (
  <View style={find_address_style.location_box}>
    <GooglePlacesAutocomplete
      query={{
        key: "AIzaSyCJA8aSLXA57dtUyybeMhyJ7vysZGdfs9Q",
        type: "geocode",
        radius: 30000,
        location: `${props.region.latitude} , ${props.region.longitude}`,
      }}
      minLength={3}
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby: "distance",
      }}
      filterReverseGeocodingByTypes={["postal_code"]}
      onPress={(data, details = null) => {
        props.setRegion({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.0125,
          longitudeDelta: 0.0125,
        });
        props.setPin({
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
        });
      }}
      placeholder="Search"
      textInputProps={{
        placeholderTextColor: "#d95a00",
        returnKeyType: "search",
      }}
      styles={{
        container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
        listView: { backgroundColor: "white" },
        textInput: {
          backgroundColor: "white",
          borderRadius: 20,
          fontWeight: "700",
          marginTop: 7,
          color: "#d95a00",
        },
        textInputContainer: {
          backgroundColor: "white",
          borderColor: "#d95a00",
          flexDirection: "row",
          alignItems: "center",
          color: "#d95a00",
        },
      }}
      renderLeftButton={() => (
        <View style={{ marginLeft: 10 }}>
          <Icon name="location-outline" size={24} color="#d95a00"></Icon>
        </View>
      )}
    />
    <MapView
      style={find_address_style.map_location_box}
      initialRegion={{
        latitude: 51.51311959688299,
        longitude: -0.11741839349269867,
        latitudeDelta: 0.0125,
        longitudeDelta: 0.0125,
      }}
      provider="google"
      region={props.region}
      onRegionChange={(event) => {
        props.setPin({
          latitude: event.latitude,
          longitude: event.longitude,
        });
      }}
      onRegionChangeComplete={(event) => {
        props.setRegion({
          latitude: event.latitude,
          longitude: event.longitude,
          latitudeDelta: event.latitudeDelta,
          longitudeDelta: event.longitudeDelta,
        });
      }}
    >
      <Marker coordinate={props.pin} />
    </MapView>
  </View>
);

const CompleteAddress = (props) => (
  <TouchableOpacity
    style={find_address_style.add_address_box}
    onPress={() => props.handleAddress()}
  >
    <Text style={find_address_style.sub_heading_white}>Add Address</Text>
  </TouchableOpacity>
);
