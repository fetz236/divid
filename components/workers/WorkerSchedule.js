import React, { useEffect, useState } from "react";
import { View, Text, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Divider } from "react-native-elements";
import { schedule_style_sheet } from "../../styles/workers/WorkerScheduleStyle";
import { Button } from "react-native";
import { auth, db } from "../../firebase";
import { SelectList } from "react-native-dropdown-select-list";

export const WorkerSchedule = ({ navigation, ...props }) => {
  const worker_selected = {
    worker: props.route.params.worker,
  };

  const [worker_schedule, setClassSchedule] = useState([]);
  const [loaded_worker_schedule, setLoadedClassSchedule] = useState(false);
  const [db_schedule_data, setdb_schedule_data] = useState([]);

  //Used to select how many hours are required
  const hours = [
    {
      key: "2",
      value: "2",
    },
    {
      key: "3",
      value: "3",
    },
    {
      key: "4",
      value: "4",
    },
    {
      key: "5",
      value: "5",
    },
    {
      key: "6",
      value: "6",
    },
    {
      key: "7",
      value: "7",
    },
    {
      key: "8",
      value: "8",
    },
  ];

  const [selected_hour, setSelectedHour] = useState(hours[0]);

  //Loads all data for the selected worker
  useEffect(() => {
    const loadData = async () => {
      let worker_data = [];
      db.collection("worker_schedule")
        .where("worker", "==", worker_selected.worker.id)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            worker_data.push(data);
          });
          setdb_schedule_data(worker_data);
        })
        .then(function () {
          let worker_temp = loadWorkerDates(worker_data, new Date());
          setClassSchedule(worker_temp);
          setLoadedClassSchedule(true);
        })
        .catch((err) => alert(err));
    };

    loadData();
  }, []);

  /*
        As the dates are stored in the database using a day model
        This means that when rendering, there has to be a date match system to display the worker's
        schedule correct
    */
  const loadWorkerDates = (worker_data, curr) => {
    const worker_temp = [];

    //set at 22 for 21 days loop
    for (let i = 0; i < 22; i++) {
      curr.setDate(curr.getDate() + 1);
      for (let j = 0; j < worker_data.length; j++) {
        if (worker_data[j].day == curr.getDay()) {
          worker_temp.push({
            date:
              curr.getDate() +
              "/" +
              (parseInt(curr.getMonth()) + 1) +
              "/" +
              curr.getFullYear(),
            start_time:
              worker_data[j].start_time[0] +
              worker_data[j].start_time[1] +
              ":" +
              worker_data[j].start_time[2] +
              worker_data[j].start_time[3],
            end_time:
              worker_data[j].end_time[0] +
              worker_data[j].end_time[1] +
              ":" +
              worker_data[j].end_time[2] +
              worker_data[j].end_time[3],
            worker: worker_data[j].worker,
            id: worker_data[j].id,
            worker_selected: worker_selected,
          });
        }
      }
    }

    //fixing the rendering to group the dates under the date object
    let grouped_worker_ = Object.values(
      worker_temp.reduce((acc, item) => {
        if (!acc[item.date])
          acc[item.date] = {
            date: item.date,
            data: [],
          };
        acc[item.date].data.push({
          date: item.date,
          start_time: item.start_time,
          end_time: item.end_time,
          id: item.id,
          worker_selected: item.worker_selected,
          worker: item.worker,
        });
        return acc;
      }, {})
    );
    return grouped_worker_;
  };

  //Variables for the date picker
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  /*
        Change date method and loads the new workers schedule
    */
  const changedDate = (event, selectedDate) => {
    let currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let today = new Date(currentDate);
    let temp_data = loadWorkerDates(db_schedule_data, today);
    setClassSchedule(temp_data);
  };

  /*
    This is a check authentication method to understand which screen
    should be rendered depending on if the user is logged in or not
    
    If the user is logged in then we render the checkout, if they are not
    then we render our authentication stack
  */
  const checkAuthentication = (w_data) => {
    w_data[selected_hour] = selected_hour;
    if (auth.currentUser) {
      navigation.navigate("Checkout", {
        navigation: navigation,
        w_data: w_data,
        worker_selected: worker_selected,
      });
    } else {
      navigation.navigate("AuthenticationScreen", {
        navigation: navigation,
        isCheckout: true,
        w_data: w_data,
        worker_selected: worker_selected,
      });
    }
  };

  return (
    <View
      style={{
        marginTop: "5%",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DateTimePicker
          testID="dateTimePicker"
          minimumDate={new Date()}
          value={date}
          mode={mode}
          display="default"
          onChange={changedDate}
        />
      </View>
      <Divider
        style={{
          marginTop: 25,
          marginBottom: 25,
        }}
      >
        <SelectHours setSelectedHour={setSelectedHour} hours={hours} />
      </Divider>
      <DisplaySchedule
        worker_schedule={worker_schedule}
        checkAuthentication={checkAuthentication}
        navigation={navigation}
      />
    </View>
  );
};

const SelectHours = (props) => (
  <View style={schedule_style_sheet.hours_style}>
    <Text style={schedule_style_sheet.hours_text}>Hours</Text>
    <SelectList
      search={false}
      defaultOption={{ key: "2", value: "2" }}
      setSelected={(val) => props.setSelectedHour(val)}
      data={props.hours}
      save="value"
    />
  </View>
);
// Utilised for displaying the schedule
const DisplaySchedule = ({ navigation, ...props }) => {
  return (
    <View showsVerticalScrollIndicator={false} style={{ marginBottom: "20%" }}>
      {props.worker_schedule.map((worker, index) => (
        <View key={index}>
          <View style={schedule_style_sheet.main_container}>
            <View style={schedule_style_sheet.date_container}>
              <Text style={schedule_style_sheet.date_text_underline}>
                {" "}
                {worker.date}
              </Text>
            </View>
            <Divider />
            {worker.data.map((item_k, k) => (
              <View style={schedule_style_sheet.item_container} key={k}>
                <View style={schedule_style_sheet.time_container}>
                  <Text style={schedule_style_sheet.date_text}>
                    {" "}
                    {item_k.start_time}-{item_k.end_time}
                  </Text>
                </View>

                <View style={schedule_style_sheet.time_container}>
                  <View style={schedule_style_sheet.book_button}>
                    <Button
                      title="Book"
                      color="white"
                      onPress={() => props.checkAuthentication(item_k)}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default WorkerSchedule;
