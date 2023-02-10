import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { user_search_bar_css } from "../../../styles/SearchHome/UserSearchBar/UserSearchBarStyle";
import { TextInput } from "react-native";
import CategorySearch from "./CategorySearch";
import { SectionList } from "react-native";
import { db } from "../../../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";

const Item = ({ title }) => (
  <View style={user_search_bar_css.flat_list}>
    <Text style={user_search_bar_css.flat_list_text}>{title}</Text>
  </View>
);

const UserSearchBar = ({ navigation }) => {
  const [search_worker_data, setSearchWorkerData] = useState([]);

  const [fully_loaded, setFullyLoaded] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryState, setCategoryState] = useState(true);

  //Loads all data (master) to be then filtered depending on what was selected
  useEffect(() => {
    const loadMasterSearchData = () => {
      let wc_data = [];
      db.collection("workers")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            data.name = data.first_name + " " + data.last_name;
            wc_data.push(data);
          });
        })
        .then(async function () {
          setSearchWorkerData(wc_data);
        });

      setMasterData([
        {
          title: "Category",
          data: require("../../../categories.json"),
        },
        {
          title: "Workers",
          data: wc_data,
        },
      ]);
    };

    loadMasterSearchData();
    setFullyLoaded(true);
  }, []);

  const searchFilter = (text) => {
    if (text) {
      setCategoryState(false);
      const new_data = masterData.reduce((result, masterData) => {
        const { title, data } = masterData;

        const filter = data.filter((element) => element.name.includes(text));

        if (filter.length !== 0) {
          result.push({
            title,
            data: filter,
          });
        }
        return result;
      }, []);
      setFilteredData(new_data);
      setSearch(text);
    } else {
      setCategoryState(true);
      setFilteredData("");
      setSearch(text);
    }
  };

  const checkNavigation = (title, item) => {
    if (title == "Workers") {
      navigation.navigate("WorkerDetail", {
        first_name: item.first_name,
        last_name: item.last_name,
        id: item.id,
        categories: item.categories,
        mobile: item.mobile,
        location: item.location,
        description: item.description,
        price: item.price,
        photoURL: item.photoURL,
        rating: item.rating,
        reviews: item.reviews,
        services: item.services,
      });
    } else if (title == "Category") {
      navigation.navigate("DisplayCategoriesScreen", item);
    }
  };

  return (
    <>
      {fully_loaded && (
        <>
          <View style={user_search_bar_css.main_container}>
            <View style={user_search_bar_css.search_bar_container}>
              <Icon
                name="search"
                size={20}
                color="#d95a00"
                style={user_search_bar_css.search_icon}
              />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Search"
                placeholderTextColor="black"
                style={user_search_bar_css.input_container}
                value={search}
                onChangeText={(text) => searchFilter(text)}
              />
            </View>
          </View>
          <View style={user_search_bar_css.flat_list_container}>
            <SectionList
              nestedScrollEnabled={false}
              sections={filteredData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ section: { title }, item }) => (
                <TouchableOpacity onPress={() => checkNavigation(title, item)}>
                  <Item title={item.name} />
                </TouchableOpacity>
              )}
              renderSectionHeader={({ section: { title } }) => (
                <Text style={user_search_bar_css.flat_list_heading}>
                  {title}
                </Text>
              )}
            />
          </View>
          <View>
            {categoryState && <CategorySearch navigation={navigation} />}
          </View>
        </>
      )}
    </>
  );
};

export default UserSearchBar;
