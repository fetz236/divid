import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth, db } from "../../firebase";
import { worker_items_style } from "../../styles/workers/WorkerItemsStyle";

export default function WorkerItems({ navigation, ...props }) {
  const [worker_details, setWorkers] = useState([]);
  const [loaded_worker, setLoadedWorkers] = useState(false);

  const items = require("../../categories.json");

  const [sorted, setSorted] = useState([]);
  const [loaded_sorted, setLoadedSorted] = useState(false);
  const [current_address, setCurrentAddress] = useState(props.current_address);

  // Convert degrees to radians
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  // Convert the latitude and longitude values to radians
  const centerPointLatRad = toRadians(current_address.location.latitude);
  const centerPointLngRad = toRadians(current_address.location.longitude);

  // useEffect to load data at the beginning
  useEffect(() => {
    const loadData = async () => {
      let filteredDocs = [];
      db.collection("workers")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const worker_data = doc.data();
            const locationLatRad = toRadians(worker_data.location.latitude);
            const locationLngRad = toRadians(worker_data.location.longitude);

            // Calculate the distance between the center point and the location using the Haversine formula
            const a =
              Math.sin((locationLatRad - centerPointLatRad) / 2) *
                Math.sin((locationLatRad - centerPointLatRad) / 2) +
              Math.cos(centerPointLatRad) *
                Math.cos(locationLatRad) *
                Math.sin((locationLngRad - centerPointLngRad) / 2) *
                Math.sin((locationLngRad - centerPointLngRad) / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = 6371 * c;

            // Add the location to the filtered docs array if it's within the maximum distance
            if (distance <= worker_data.radius) {
              filteredDocs.push(worker_data);
            }
          });
        })
        .then(function () {
          setWorkers(filteredDocs);
          setSorted(filteredDocs);
          setLoadedWorkers(true);
        })
        .catch((err) => alert(err));
    };

    loadData();
  }, []);

  useEffect(() => {
    if (props.refreshData) {
      const loadData = async () => {
        let filteredDocs = [];
        db.collection("workers")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const worker_data = doc.data();
              const locationLatRad = toRadians(worker_data.location.latitude);
              const locationLngRad = toRadians(worker_data.location.longitude);

              // Calculate the distance between the center point and the location using the Haversine formula
              const a =
                Math.sin((locationLatRad - centerPointLatRad) / 2) *
                  Math.sin((locationLatRad - centerPointLatRad) / 2) +
                Math.cos(centerPointLatRad) *
                  Math.cos(locationLatRad) *
                  Math.sin((locationLngRad - centerPointLngRad) / 2) *
                  Math.sin((locationLngRad - centerPointLngRad) / 2);
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              const distance = 6371 * c;

              // Add the location to the filtered docs array if it's within the maximum distance
              if (distance <= worker_data.radius) {
                filteredDocs.push(worker_data);
              }
            });
          })
          .then(function () {
            setWorkers(filteredDocs);
            setSorted(filteredDocs);
            setLoadedWorkers(true);
          })
          .catch((err) => alert(err));
      };
      loadData();
      props.setRefreshData(false);
    }
  }, [props.refreshData]);

  //loads the relevant data depending on what category is selected
  const loadCategories = (selected_cat) => {
    const sorted_data = [];
    for (let i = 0; i < worker_details.length; i++) {
      let f_cat = worker_details[i].categories;
      for (let j = 0; j < f_cat.length; j++) {
        if (f_cat[j] == selected_cat.__id__) {
          sorted_data.push(worker_details[i]);
        }
      }
    }
    setSorted(sorted_data);
    setLoadedSorted(true);
  };

  //Loads all necessary sorted data
  const loadAll = () => {
    setSorted(worker_details);
    setLoadedSorted(false);
  };

  //Checks to see if the user is logged in for address authentication
  const checkAddress = () => {
    if (auth.currentUser) {
      navigation.navigate("CurrentAddressScreen", {
        navigation: navigation,
        setCurrentAddress: setCurrentAddress,
        setRefreshData: props.setRefreshData,
      });
    } else {
      navigation.navigate("LoginAddressNeededScreen", {
        navigation: navigation,
      });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <>
        {loaded_worker && (
          <>
            {loaded_sorted && <Reload loadAll={loadAll} />}
            <View style={{ backgroundColor: "white", padding: 15 }}>
              <SearchBar
                current_address={current_address}
                checkAddress={checkAddress}
              />
            </View>
            <Categories items={items} loadCategories={loadCategories} />
            {sorted.map((worker, index) => (
              <TouchableOpacity
                activeOpacity={1}
                style={{}}
                key={index}
                onPress={() =>
                  navigation.navigate("WorkerDetail", {
                    firstName: worker.firstName,
                    lastName: worker.lastName,
                    id: worker.id,
                    categories: worker.categories,
                    mobile: worker.mobile,
                    mobileCallingCode: worker.mobileCallingCode,
                    description: worker.description,
                    price: worker.price,
                    location: worker.location,
                    photoURL: worker.photoURL,
                    rating: worker.rating,
                    reviews: worker.reviews,
                    services: worker.services,
                  })
                }
              >
                <View style={{ marginBottom: 10 }}>
                  <View style={worker_items_style.worker_item_style}>
                    <WorkerImage worker_details={worker} />
                    <WorkerInfo worker_details={worker} />
                  </View>
                  <Divider
                    width={0.5}
                    orientation="vertical"
                    style={{ marginTop: 5 }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </>
    </ScrollView>
  );
}

//Utilised to show a reload button in charge of refreshing the main section to the tailored requirements of the user
const Reload = (props) => (
  <View style={worker_items_style.reload}>
    <TouchableOpacity
      style={worker_items_style.reload_button}
      onPress={() => props.loadAll(false)}
    >
      <Text style={worker_items_style.white_subheading}>SHOW ALL</Text>
    </TouchableOpacity>
  </View>
);

//Loads the horizontal search bar
const Categories = (props) => (
  <View style={worker_items_style.categories_container}>
    {props.items && (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => props.loadCategories(item)}
          >
            <View key={index} style={worker_items_style.item_container}>
              <MaterialCommunityIcons
                name={item.icon_name}
                style={worker_items_style.image_def}
              />
              <Text style={worker_items_style.text_def}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )}
  </View>
);

const WorkerInfo = (props) => (
  <View style={worker_items_style.worker_info}>
    <Text style={worker_items_style.worker_title_style}>Cleaner</Text>
    <Text>
      {props.worker_details.firstName} {props.worker_details.lastName}
    </Text>
    <Text>🌟 {props.worker_details.rating}</Text>
    <Text>£{(props.worker_details.price / 100).toFixed(2)} per hour</Text>
  </View>
);

const WorkerImage = (props) => (
  <View>
    <Image
      source={{ uri: props.worker_details.photoURL }}
      style={worker_items_style.worker_profile_image}
    />
  </View>
);

const SearchBar = (props) => (
  <View style={worker_items_style.search_bar_container}>
    <View style={worker_items_style.location_button}>
      <Icon name="location-outline" size={24} color="#d95a00"></Icon>
    </View>
    <View style={worker_items_style.textInputContainer}>
      <Text style={worker_items_style.textInput}>
        {props.current_address.address1} {props.current_address.address2}
      </Text>
    </View>
    <TouchableOpacity
      style={worker_items_style.change_address}
      onPress={() => props.checkAddress()}
    >
      <Icon name="time-outline" size={14} color="white"></Icon>
      <Text style={{ color: "white" }}> Change </Text>
    </TouchableOpacity>
  </View>
);
