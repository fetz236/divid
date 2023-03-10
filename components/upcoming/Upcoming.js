import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { auth, db } from "../../firebase";
import { upcoming_style_sheet } from "../../styles/upcoming/UpcomingStyle";
import NoLogin from "../userDetail/NoLogin";

export default function Upcoming({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [loadedBookings, setLoadedBookings] = useState(false);
  const [groupedBookings, setGroupedBookings] = useState([]);
  console.log();

  useEffect(() => {
    const unsubscribe = db
      .collection("bookings")
      .where("user", "==", auth.currentUser.uid)
      .orderBy("date")
      .orderBy("start_time")
      .onSnapshot((snapshot) => {
        const newBookings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(newBookings);

        const grouping = Object.values(
          newBookings.reduce((acc, item) => {
            const date = item.date;
            if (!acc[date]) {
              acc[date] = {
                date: date,
                data: [],
              };
            }
            acc[date].data.push(item);
            return acc;
          }, {})
        );
        setGroupedBookings(grouping);
        setLoadedBookings(true);
      });
    return () => unsubscribe();
  }, []);

  // ...

  const handleDeleteBooking = (bookingId) => {
    // Remove the deleted booking from the state of the bookings
    const updatedBookings = bookings.filter(
      (booking) => booking.id !== bookingId
    );
    setBookings(updatedBookings);

    // Update the grouped bookings by grouping the updated bookings again
    const groupedBookings = Object.values(
      updatedBookings.reduce((acc, item) => {
        const date = item.date;
        if (!acc[date]) {
          acc[date] = {
            date: date,
            data: [],
          };
        }
        acc[date].data.push(item);
        return acc;
      }, {})
    )
      .filter((group) => group.data.length > 0) // Filter out any groups with no bookings
      .filter((group) => {
        const today = new Date();
        const groupDate = new Date(group.date);
        return groupDate >= today;
      }); // Filter out any past dates

    // Update the groupedBookings state with the new value
    setGroupedBookings(groupedBookings);
  };

  return (
    <View>
      {loadedBookings && (
        <>
          <BookingHeader />
          {groupedBookings.length > 0 && (
            <>
              {groupedBookings.map((booking, index) => (
                <View key={index}>
                  <Divider style={upcoming_style_sheet.divider_date} />
                  <View style={upcoming_style_sheet.date_header}>
                    <Text style={upcoming_style_sheet.sub_heading}>
                      {booking.date}
                    </Text>
                  </View>
                  {booking.data.map((value, j_index) => (
                    <View key={j_index}>
                      <Divider style={upcoming_style_sheet.divider_date} />
                      <UpcomingBookings
                        key={index}
                        navigation={navigation}
                        handleDeleteBooking={handleDeleteBooking}
                        booking={value}
                      />
                    </View>
                  ))}
                </View>
              ))}
            </>
          )}
          {groupedBookings.length == 0 && <NoBookings />}
        </>
      )}
      {!loadedBookings && <NoLogin />}
    </View>
  );
}

const BookingHeader = () => (
  <View style={upcoming_style_sheet.header_container}>
    <Text style={upcoming_style_sheet.title}>Upcoming Bookings</Text>
  </View>
);

const UpcomingBookings = (props) => (
  <View style={upcoming_style_sheet.main_container}>
    <InfoHeader booking={props.booking} />

    <View style={upcoming_style_sheet.display_buttons}>
      <ContactButton booking={props.booking} />
      <CancelBooking
        navigation={props.navigation}
        booking={props.booking}
        handleDeleteBooking={props.handleDeleteBooking}
      />
    </View>
  </View>
);

const InfoHeader = (props) => (
  <View style={upcoming_style_sheet.info_container}>
    <View style={upcoming_style_sheet.wrap_text}>
      <View style={upcoming_style_sheet.space_text}>
        <Text style={upcoming_style_sheet.sub_heading_button}>
          {props.booking.start_time} - {props.booking.end_time}
        </Text>
      </View>
      <View style={upcoming_style_sheet.space_text}>
        <Text style={upcoming_style_sheet.sub_heading_button}>
          {props.booking.reference_number}{" "}
        </Text>
      </View>
      <View style={upcoming_style_sheet.space_text}>
        <Text style={upcoming_style_sheet.sub_heading_button}>
          {props.booking.name}{" "}
        </Text>
      </View>
    </View>
  </View>
);
const ContactButton = (props) => (
  <TouchableOpacity
    style={upcoming_style_sheet.btn_container}
    onPress={() => {
      Linking.openURL(`tel:+447444463391`);
    }}
  >
    <View>
      <Text style={upcoming_style_sheet.btn_text}> Contact </Text>
    </View>
  </TouchableOpacity>
);

const CancelBooking = (props) => {
  if (props.booking.status != "pending") {
    return (
      <TouchableOpacity
        style={upcoming_style_sheet.btn_container}
        onPress={() =>
          props.navigation.navigate("Cancel", {
            booking: props.booking,
            handleDeleteBooking: props.handleDeleteBooking,
          })
        }
      >
        <View>
          <Text style={upcoming_style_sheet.btn_text}> Cancel </Text>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={upcoming_style_sheet.btn_container}
        onPress={() =>
          props.navigation.navigate("CancelPendingBooking", {
            booking: props.booking,
            handleDeleteBooking: props.handleDeleteBooking,
          })
        }
      >
        <View>
          <Text style={upcoming_style_sheet.btn_text}> Cancel </Text>
        </View>
      </TouchableOpacity>
    );
  }
};

const NoBookings = () => (
  <View style={upcoming_style_sheet.no_booking_header_container}>
    <Text style={upcoming_style_sheet.no_booking_title}>
      No current bookings at the moment
    </Text>
  </View>
);
