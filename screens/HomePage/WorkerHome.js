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
  console.log(current_address);

  const [addressLoad, setAddressLoad] = useState(true);
  useEffect(() => {
    const loadUserAddress = async () => {
      const subcollectionRef = db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("address");
      const activeDocsQuery = subcollectionRef.where("isActive", "==", true);
      activeDocsQuery
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size > 0) {
            // Subcollection exists
            querySnapshot.forEach((doc) => {
              setCurrentAddress(doc.data());
              setAddressLoad(true);
            });
          } else {
            // Subcollection does not exist
            setCurrentAddress({
              address1: "30 Aldwych",
              address2: "",
              addressPostal: "WC2B 4BG",
              location: { latitude: 51.513187, longitude: -0.117499 },
            });
            setAddressLoad(true);
          }
        })
        .catch((error) => {
          console.log("Error getting subcollection: ", error);
        });
    };

    /*
    db.collection(`users/${auth.currentUser.uid}/address`)
        .where("isActive", "==", true)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            if (doc.data() != "{}") {
              setAddressLoad(true);
            }
          });
        });
    */
    auth.onAuthStateChanged(function (authState) {
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
    });
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
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
