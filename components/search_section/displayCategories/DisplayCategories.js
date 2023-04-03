import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../../firebase";
import { display_categories_style } from "../../../styles/SearchHome/DisplayCategories/DisplayCategoriesStyle";
import { worker_items_style } from "../../../styles/workers/WorkerItemsStyle";
import { Divider } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function DisplayCategories({ navigation, ...props }) {
  const [worker, setWorker] = useState([]);
  const [loaded_worker, setLoadedWorker] = useState(false);

  useEffect(() => {
    //Load all worker data
    const loadData = async () => {
      let fit_data = [];
      db.collection("workers")
        .where("categories", "array-contains", props.route.params.__id__)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            fit_data.push(data);
          });
        })
        .then(async function () {
          await setWorker(fit_data);
          await setLoadedWorker(true);
        })
        .catch((err) => alert(err));
    };

    loadData();
  }, []);

  return (
    <SafeAreaView>
      {loaded_worker && worker.length > 0 && (
        <WorkerItems worker={worker} navigation={navigation} />
      )}

      {loaded_worker && worker.length == 0 && (
        <View style={display_categories_style.header_container}>
          <Text style={display_categories_style.title}>
            Currently we do not have any partners under this category ;({" "}
          </Text>
          <Text style={display_categories_style.title_2}>Stay tuned!</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const WorkerItems = (props) =>
  props.worker.map((worker, index) => (
    <TouchableOpacity
      activeOpacity={1}
      style={{}}
      key={index}
      onPress={() =>
        props.navigation.navigate("WorkerDetail", {
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
        <Divider width={0.5} orientation="vertical" style={{ marginTop: 5 }} />
      </View>
    </TouchableOpacity>
  ));

const WorkerInfo = (props) => (
  <View style={worker_items_style.worker_info}>
    <Text style={worker_items_style.worker_title_style}>
      {props.worker_details.firstName} {props.worker_details.lastName}
    </Text>
    <Text>{props.worker_details.description}</Text>
    <Text>£{(props.worker_details.price / 100).toFixed(2)}</Text>
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
