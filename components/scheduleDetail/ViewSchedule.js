import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Divider } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { schedule_style_sheet } from '../../styles/trainers/TrainerScheduleStyle'
import { Button } from 'react-native';
import { auth, db } from '../../firebase';


export const ViewSchedule = ({navigation, ...props}) => {

    /*
        Object {
            "class": Object {
                "categories": Array [
                "Abw5hySlBsbHvcKN4vM9",
                ],
                "curr_cap": "0",
                "description": "Advanced Spinning class",
                "id": "4vY771DMIX7422rzWW7l",
                "image": "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2Fclass_images%2F20220923135655c.jpg?alt=media&token=26f06243-25ac-4c8b-af9c-ef9dec5d06c7",
                "max_cap": 25,
                "name": "Spinning",
                "price": "$80",
            },
            "fc": Object {
                "categories": Array [
                "q9TU23VcpJh1YeyBNlU9",
                "1PVAG7I7cTnxNZqCMehW",
                ],
                "id": "jP6AalbtPcjk0Lbcxo5q",
                "image": Array [
                "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003536.jpg?alt=media&token=63bf024e-396d-4655-aced-a10149ded044",
                "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003535.jpg?alt=media&token=4366df23-90f9-4af6-a47e-9bcd305af10b",
                "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003233.jpg?alt=media&token=269cbc10-7a49-48d4-8fc3-2a7ef2cdb69b",
                "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003433.jpg?alt=media&token=846b35a2-9b61-4fad-a335-97c81c4cbc90",
                "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003400.jpg?alt=media&token=b0ecdd9d-3de5-40ca-9810-9212044e6d49",
                "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003335.jpg?alt=media&token=0d9bd9e2-af1c-49fc-a645-2960becd05c7",
                "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003333.jpg?alt=media&token=4b0b0c3a-c409-4d29-8a0e-583794d2f29c",
                ],
                "location": Object {
                "latitude": 51.51435857837156,
                "longitude": -0.15710420123305274,
                },
                "name": "The Gym Way - Marble Arch",
                "rating": 5,
                "reviews": 1,
                "subscription": "red",
                "telephone_number": "+442076294655",
            },
        }
    */
    const class_selected = {
        class:props.route.params.class,
        fc:props.route.params.fc,
    }

    const [class_schedule, setClassSchedule] = useState([])
    const [loaded_class_schedule, setLoadedClassSchedule] = useState(false)
    const [db_schedule_data, setdb_schedule_data] = useState([])

    useEffect( async() => {
        const loadData = async() => {
            let class_data = []
            db.collection('schedule').where("cl", "==", class_selected.class.id).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id
                    class_data.push(data)
                })
                setdb_schedule_data(class_data)
            }).then(function(){

                let class_temp = loadClassDates(class_data, new Date())
                
                setClassSchedule(class_temp)
                setLoadedClassSchedule(true)
            }
            ).catch(err => alert(err))
            
        }

        if (class_schedule.length == 0){
            await loadData()
        }
    }, [])

    const loadClassDates = (class_data, curr) =>{
        const class_temp = []

        
        //Convestion of array of objects to only list of dates

        const closed_dates = props.route.params.class.closed_days.map(function(o,i) {
            return o.date;
          })

        for (let i =0; i<22; i++){
            curr.setDate(curr.getDate() +1)
            for(let j =0; j<class_data.length; j++){
                if (class_data[j].day == curr.getDay() && closed_dates.includes(curr.toISOString().split('T')[0]) == false){
                    class_temp.push({
                        'date':curr.getDate() + "/" + (parseInt(curr.getMonth())+1) + "/" + curr.getFullYear(), 
                        'start_time':class_data[j].start_time[0]+class_data[j].start_time[1] 
                        + ":" + class_data[j].start_time[2] + class_data[j].start_time[3],
                        'end_time':class_data[j].end_time[0]+class_data[j].end_time[1] 
                        + ":" + class_data[j].end_time[2] + class_data[j].end_time[3],
                        'cl':class_data[j].cl,
                        'id':class_data[j].id,
                        'class_selected':class_selected,
                    })
                }
            }
            
        }

        let grouped_classes = Object.values(class_temp.reduce((acc, item) => {
            if (!acc[item.date]) acc[item.date] = {
                date: item.date,
                data: []
    
            };
            acc[item.date].data.push({
                date: item.date,
                start_time: item.start_time,
                end_time: item.end_time,
                id: item.id,
                class_selected: item.class_selected,
                cl: item.cl,
            });
            return acc;
        }
        , {}))

        return grouped_classes
    }

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    const [classState, setClassState] = useState(false);
    const [indexState, setIndexState] = useState(-1);
    
    const changedDate = (event, selectedDate) => {
        let currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        
        let today = new Date(currentDate);
        let temp_data = loadClassDates(db_schedule_data,today)
        setClassSchedule(temp_data)
    };  


    const showClass = (bool, index) =>{
        if (bool){
            setIndexState(index);
            setClassState(true);
        }
    };

    const checkAuthentication = (u_data) => {
        if (auth.currentUser) {
            navigation.navigate("Checkout",{
                navigation: navigation,
                u_data: u_data,
            }
            )
        } else {
            navigation.navigate("AuthenticationScreen", {
                navigation:navigation,
                isCheckout: true,
                u_data: u_data,

            })
        }
        
    };

    

    return (
      <View style ={{
          marginTop:'5%',
      }}>
          <View style ={{
              justifyContent: 'center',
              alignItems: 'center',
          }}>
              <DateTimePicker
                  testID="dateTimePicker"
                  minimumDate={date}
                  value={date}
                  mode='date'
                  is24Hour={true}
                  display="default"
                  onChange={changedDate}
                  style={schedule_style_sheet.date_time_style}
                  />
          </View>
          <Divider style={{
              marginTop:25,
              marginBottom:25,

          }}>
          </Divider>
          <DisplaySchedule classState={classState} 
            indexState={indexState} 
            showClass={showClass} 
            class_schedule={class_schedule}
            checkAuthentication={checkAuthentication}
            navigation={navigation}
            />
      </View>
    );
  };

const DisplaySchedule = ({navigation, ...props}) => {
    return (
    <View showsVerticalScrollIndicator={false} style={{marginBottom:'20%'}}>
        {props.class_schedule.map((item,index) => (
            <View key={index}>
                <View style={schedule_style_sheet.main_container}>
                    <View style= {schedule_style_sheet.date_container}>
                        <Text style={schedule_style_sheet.date_text_underline}> {item.date}</Text>
                    </View>
                    <Divider/>
                    {item.data.map((item_k, k) => (
                        <View style={schedule_style_sheet.item_container} key={k}>
                            <View style= {schedule_style_sheet.time_container} >
                                <Text style={schedule_style_sheet.date_text}> {item_k.class_selected.class.name}</Text>
                            </View>
                            <View style= {schedule_style_sheet.time_container} >
                                <Text style={schedule_style_sheet.date_text}> {item_k.start_time}-{item_k.end_time}</Text>
                            </View>
                            <View style= {schedule_style_sheet.time_container} >
                                <View style ={schedule_style_sheet.book_button}>
                                    <Button title="Book" color="white"  onPress={() => props.checkAuthentication(item_k)}/>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                { /*
                    <View>
                        <Text style={{marginLeft:'5%'}}>
                        {props.classState}
                        </Text>

                        {
                            props.classState && <TimeInfo item={item} index={index} indexState={props.indexState}
                            checkAuthentication = {props.checkAuthentication} />
                        }
                    </View>
                    */
                }
            </View>
        ))}

    </View>
    )
};


  export default ViewSchedule;

/*

const TimeInfo = ({navigation, ...props}) => {
    if (props.index == props.indexState){
        return(
            <View style={schedule_style_sheet.time_container}>
                <View style={schedule_style_sheet.time_text_container}>
                    <Text style={schedule_style_sheet.time_text}> divid </Text>
                </View>
                <Text>{props.item.time}</Text>
                <View style ={schedule_style_sheet.trainer_container}>
                    <TrainerCourse time={props.time} checkAuthentication={props.checkAuthentication} key={index}></TrainerCourse>
                </View>
            </View>
        )
    }   
    else{
        return null;
    }

};

  
const TrainerCourse = ({navigation, ...props}) => (
    <TouchableOpacity onPress={()=> props.checkAuthentication()}>
        <View style={schedule_style_sheet.course_container}>
            <Text style= {schedule_style_sheet.course_text}>{props.time}</Text>
        </View>
    </TouchableOpacity>

);



const [date, setDate] = useState(new Date(1598051730000));
const [mode, setMode] = useState('date');
const [show, setShow] = useState(false);

const onChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setShow(Platform.OS === 'ios');
  setDate(currentDate);
};

const schedule_detail = {
    date: '21/02/2021',
    time: '19:00',
    title: "Free Gym",

};



export default function TrainerSchedule({navigation, ...props}) {


  return (
    <View style ={{
        marginTop:80,
    }}>
        <View style ={{
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={{
                fontSize: 24,
            }}>Training Date</Text>
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode='date'
                is24Hour={true}
                display="default"
                onChange={onChange}
                style={{
                    width: 100,
                    alignItems:'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    marginTop: 10,
                }}
                />
        </View>
        <Divider style={{
            marginTop:25,
        }}>
        </Divider>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style= {{
                marginTop:5,
                marginBottom:5,
                marginLeft:10,
            }}>
                <Text style={{
                    fontSize: 20
                }}> Date </Text>
            </View>
                <ScheduleHeader></ScheduleHeader>         
        </ScrollView>
        
    </View>
  );
}



*/