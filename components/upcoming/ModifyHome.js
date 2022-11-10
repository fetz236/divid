import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, CheckBox, Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { modify_home_style } from '../../styles/upcoming/ModifyHomeStyle'

const fitness_center = {
    name:'Gym Way Marble Arch',
    class:'Spinning',
    trainer:'Kate Wilson',
    price: '£5.00'
}

export default function ModifyHome({navigation}) {
    const [date, setDate] = useState(new Date());
    const [accepted, setAccepted] = useState(false)
    const handleModification = () => {
    };

    return (
        <View>
            <ModifyHeader/>
            <Divider style={modify_home_style.divider}/>
            <ModifyMain/>
            <Divider style={modify_home_style.divider}/>
            <ModifyDate date={date}/>
            <AcceptTerms  setAccepted={setAccepted} accepted={accepted} fitness_center={fitness_center}/>
            <Divider style={modify_home_style.divider}/>
            <ConfirmModification navigation={navigation} handleModification={handleModification}/>
        </View> 
    )
}


const ModifyHeader = () => (
    <View style={modify_home_style.header_container}>
        <Text style={modify_home_style.title}>Confirm Modification</Text>
    </View>
)

const ModifyMain = () => (
    <View>
        <View style={modify_home_style.modify_container}>
            <Text style={modify_home_style.modify_header}> You are able to modify your booking</Text>
        </View>
        <View style={modify_home_style.modify_info}>
            <Text style={modify_home_style.modify_text}>You may be charged a fee for modifying the booking</Text>
        </View>
    </View>
)

const ModifyDate = (props) => (
    <View style={modify_home_style.confirm_modification}>
        <View style={modify_home_style.confirm_container}>
            <Text style={modify_home_style.title}>Select a new date and time for your trainer</Text>
        </View>
        <View style={modify_home_style.all_buttons}>
            <DateTimePicker
                  testID="dateTimePicker"
                  value={props.date}
                  mode='date'
                  is24Hour={true}
                  display="default"
                  style={modify_home_style.date_time_style}
                />       
                <DateTimePicker
                  testID="dateTimePicker"
                  value={props.date}
                  mode='time'
                  is24Hour={true}
                  display="default"
                  style={modify_home_style.time_style}
                />    
        </View>
    </View>
)

const AcceptTerms = (props) => (
    <View style={modify_home_style.accept_terms}>
        <View style={modify_home_style.confirm_container}>
            <Text style={modify_home_style.sub_heading}>You will be charged a fee of {props.fitness_center.price} at {props.fitness_center.name} completing 
            the {props.fitness_center.class} class with trainer {props.fitness_center.trainer}
            </Text>
        <CheckBox 
            style={{
                color:'#d95a00', 
            }}
            checkedColor={{
                color:'#d95a00',

            }}
            containerStyle={{backgroundColor:'transparent',
            borderWidth:0,
            color:'#d95a00'}}
            textStyle={{color:'#d95a00'}}
            title={"Accept Terms"}
            checked={props.accepted}
            onPress={()=> props.setAccepted(!props.accepted)}>
        </CheckBox>
        </View>

    </View>
)
const ConfirmModification = (props) => (
    <View style={modify_home_style.confirm_modification}>
        <View style={modify_home_style.confirm_container}>
            <Text style={modify_home_style.title}>Confirm Modification</Text>
        </View>
        <View style={modify_home_style.all_buttons}>
            
            <TouchableOpacity style={modify_home_style.button_container}
                onPress={props.handleModification}>
                <Text style={modify_home_style.button_text}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={modify_home_style.button_container}
                onPress={props.handleModification}>
                <Text style={modify_home_style.button_text}>Confirm</Text>
            </TouchableOpacity>
        </View>
    </View>

    
)