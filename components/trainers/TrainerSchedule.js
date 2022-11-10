import React, {useEffect, useState} from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Divider } from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { schedule_style_sheet } from '../../styles/trainers/TrainerScheduleStyle'
import { Button } from 'react-native';
import { auth, db } from '../../firebase';

export const TrainerSchedule = ({navigation, ...props}) => {
    const trainer_selected = {
        trainer:props.route.params.trainer,
    }

    const [trainer_schedule, setClassSchedule] = useState([])
    const [loaded_trainer_schedule, setLoadedClassSchedule] = useState(false)
    const [db_schedule_data, setdb_schedule_data] = useState([])

    useEffect( async() => {
        const loadData = async() => {
            let trainer_data = []
            db.collection('trainer_schedule').where("trainer", "==", trainer_selected.trainer.id).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id
                    trainer_data.push(data)
                })
                setdb_schedule_data(trainer_data)
            }).then(function(){

                let trainer_temp = loadTrainerDates(trainer_data, new Date())
                setClassSchedule(trainer_temp)
                setLoadedClassSchedule(true)
            }
            ).catch(err => alert(err))
            
        }

        if (trainer_schedule.length == 0){
            await loadData()
        }
    }, [])

    const loadTrainerDates = (trainer_data, curr) =>{
        const trainer_temp = []
        
        for (let i =0; i<22; i++){
            curr.setDate(curr.getDate() +1)
            for(let j =0; j<trainer_data.length; j++){
                if (trainer_data[j].day == curr.getDay()){
                    trainer_temp.push({
                        'date':curr.getDate() + "/" + (parseInt(curr.getMonth())+1) + "/" + curr.getFullYear(), 
                        'start_time':trainer_data[j].start_time[0]+trainer_data[j].start_time[1] 
                        + ":" + trainer_data[j].start_time[2] + trainer_data[j].start_time[3],
                        'end_time':trainer_data[j].end_time[0]+trainer_data[j].end_time[1] 
                        + ":" + trainer_data[j].end_time[2] + trainer_data[j].end_time[3],
                        'trainer':trainer_data[j].trainer,
                        'id':trainer_data[j].id,
                        'trainer_selected':trainer_selected,
                    })
                }
            }
            
        }

        let grouped_trainers = Object.values(trainer_temp.reduce((acc, item) => {
            if (!acc[item.date]) acc[item.date] = {
                date: item.date,
                data: []
    
            };
            acc[item.date].data.push({
                date: item.date,
                start_time: item.start_time,
                end_time: item.end_time,
                id: item.id,
                trainer_selected: item.trainer_selected,
                trainer: item.trainer,
            });
            return acc;
        }
        , {}))
        return grouped_trainers
    }



    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');

    const [trainerState, setTrainerState] = useState(false);
    const [indexState, setIndexState] = useState(-1);
    
    const changedDate = (event, selectedDate) => {
        let currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        
        let today = new Date(currentDate);
        let temp_data = loadTrainerDates(db_schedule_data,today)
        setClassSchedule(temp_data)
    };  


    const showTrainer = (bool, index) =>{
        if (bool){
            setIndexState(index);
            setTrainerState(true);
        }
    };

    const checkAuthentication = (t_data) => {
        if (auth.currentUser) {
            navigation.navigate("Checkout",{
                navigation: navigation,
                t_data: t_data,
            }
            )
        } else {
            navigation.navigate("AuthenticationScreen", {
                navigation:navigation,
                isCheckout: true,
                t_data: t_data,

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
          <DisplaySchedule trainerState={trainerState} 
            indexState={indexState} 
            showTrainer={showTrainer} 
            trainer_schedule = {trainer_schedule}
            checkAuthentication={checkAuthentication}
            navigation={navigation}
            />
      </View>
    );
  };

const DisplaySchedule = ({navigation, ...props}) => {
    return (
    <View showsVerticalScrollIndicator={false} style={{marginBottom:'20%'}}>
        {props.trainer_schedule.map((trainer,index) => (
            <View key={index}>
                <View style={schedule_style_sheet.main_container}>
                    <View style= {schedule_style_sheet.date_container}>
                        <Text style={schedule_style_sheet.date_text_underline}> {trainer.date}</Text>
                    </View>
                    <Divider/>
                    {trainer.data.map((item_k, k) => (
                        <View style={schedule_style_sheet.item_container} key={k}>
                            <View style= {schedule_style_sheet.time_container} >
                                <Text style={schedule_style_sheet.date_text}> {item_k.trainer_selected.trainer.name}</Text>
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

                    </Text>

                    {
                        props.trainerState && <TimeInfo trainer={trainer} index={index} indexState={props.indexState}
                        checkAuthentication = {props.checkAuthentication} />
                    }
                </View>
                */}
            </View>
        ))}

    </View>
    )
};

const TimeInfo = ({navigation, ...props}) => {
    if (props.index == props.indexState){
        return(
            <View style={schedule_style_sheet.time_container}>
                <View style={schedule_style_sheet.time_text_container}>
                    <Text style={schedule_style_sheet.time_text}> divid </Text>
                </View>
                <View style ={schedule_style_sheet.trainer_container}>
                    {props.trainer.time.map((time,index) => (
                        <TrainerCourse time={time} checkAuthentication={props.checkAuthentication} key={index}></TrainerCourse>
                    ))}
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

  export default TrainerSchedule;