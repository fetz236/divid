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
    // Initialize Firebase

    // Get a reference to the "bookings" collection
    const bookingsCollection = db.collection("bookings");

    // Define the bookings data to be added
    const bookingsData = [
      {
        status: "pending",
        date: "2023-02-23",
        start_time: "13:00",
        end_time: "15:00",
        reference_number: "MZN7K1A2LQ",
        location: {
          latitude: 51.513274,
          longitude: -0.16293,
        },
        address: "Hyde Park, London W2 2UH, UK",
        worker_mobile_calling_code: "+1",
        worker_mobile: "555-555-5555",
        worker: "fF6cJkAERQbUfftdTF5fZTMI3Si2",
        user: "aYTEhxpz3fdQIT43QSK5oBXEVNA3",
      },
      {
        status: "pending",
        date: "2023-02-24",
        start_time: "9:00",
        end_time: "12:00",
        reference_number: "FH8J5K9BNP",
        location: {
          latitude: 51.507911,
          longitude: -0.089562,
        },
        address:
          "St. Paul's Cathedral, St. Paul's Churchyard, London EC4M 8AD, UK",
        worker_mobile_calling_code: "+1",
        worker_mobile: "555-123-4567",
        worker: "fF6cJkAERQbUfftdTF5fZTMI3Si2",
        user: "aYTEhxpz3fdQIT43QSK5oBXEVNA3",
      },
      {
        status: "pending",
        date: "2023-02-25",
        start_time: "10:00",
        end_time: "13:00",
        reference_number: "YZ1N7KM3JS",
        location: {
          latitude: 51.5054,
          longitude: -0.086512,
        },
        address:
          "Tower of London, St Katharine's & Wapping, London EC3N 4AB, UK",
        worker_mobile_calling_code: "+1",
        worker_mobile: "555-555-1212",
        worker: "fF6cJkAERQbUfftdTF5fZTMI3Si2",
        user: "aYTEhxpz3fdQIT43QSK5oBXEVNA3",
      },
    ];

    // Loop through each booking and add it as a new document in the "bookings" collection
    bookingsData.forEach((booking) => {
      bookingsCollection
        .add(booking)
        .then((docRef) => {
          console.log("Booking added with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding booking: ", error);
        });
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
