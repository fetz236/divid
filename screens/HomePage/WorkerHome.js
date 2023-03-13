import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native";
import GeneralInfo from "../../components/workers/GeneralInfo";
import WorkerItems from "../../components/workers/WorkerItems";
import { auth, db } from "../../firebase";

/*

This is the home page for all workers that will be present in the databse

*/
export default function WorkerHome({ route, navigation }) {
  const [current_address, setCurrentAddress] = useState({
    address1: "30 Aldwych",
    address2: "",
    addressPostal: "WC2B 4BG",
    location: { latitude: 51.513187, longitude: -0.117499 },
  });

  const [addressLoad, setAddressLoad] = useState(true);
  const [refreshData, setRefreshData] = useState(false);

  const loadUserAddress = async () => {
    const subcollectionRef = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("address");
    const activeDocsQuery = subcollectionRef.where("isActive", "==", true);
    try {
      const querySnapshot = await activeDocsQuery.get();
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          setCurrentAddress(doc.data());
          setRefreshData(true);
        });
      } else {
        setCurrentAddress({
          address1: "30 Aldwych",
          address2: "",
          addressPostal: "WC2B 4BG",
          location: { latitude: 51.513187, longitude: -0.117499 },
        });
      }
    } catch (error) {
      alert("Error loading home screen" + error);
    }
    setAddressLoad(true);
  };

  const handleAuthStateChange = (authState) => {
    if (authState) {
      setAddressLoad(false);
      loadUserAddress();
    } else {
      setAddressLoad(false);
      setCurrentAddress({
        address1: "30 Aldwych",
        address2: "",
        addressPostal: "WC2B 4BG",
        location: { latitude: 51.513187, longitude: -0.117499 },
      });
      setAddressLoad(true);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(handleAuthStateChange);
  }, []);

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <View style={{ backgroundColor: "white" }}>
          <GeneralInfo
            navigation={navigation}
            current_address={current_address}
            setCurrentAddress={setCurrentAddress}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {addressLoad && (
            <WorkerItems
              navigation={navigation}
              current_address={current_address}
              setCurrentAddress={setCurrentAddress}
              refreshData={refreshData}
              setRefreshData={setRefreshData}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
