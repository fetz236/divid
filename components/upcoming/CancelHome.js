import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button, CheckBox, Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { cancel_home_style } from '../../styles/upcoming/CancelHomeStyle'

const fitness_center = {
    name:'Gym Way Marble Arch',
    class:'Spinning',
    trainer:'Kate Wilson',
    price: '£5.00'
}

export default function CancelHome({navigation}) {

    const [accepted, setAccepted] = useState(false)
    const handleCancellation = () => {
        console.log("Cancelllleedd")
    };

    return (
        <View>
            <CancelHeader/>
            <Divider style={cancel_home_style.divider}/>
            <CancelMain/>
            <AcceptTerms  setAccepted={setAccepted} accepted={accepted} fitness_center={fitness_center}/>
            <Divider style={cancel_home_style.divider}/>
            <ConfirmCancellation navigation={navigation} handleCancellation={handleCancellation}/>
        </View> 
    )
}


const CancelHeader = () => (
    <View style={cancel_home_style.header_container}>
        <Text style={cancel_home_style.title}>Confirm Cancellation</Text>
    </View>
)

const CancelMain = () => (
    <View>
        <View style={cancel_home_style.cancel_container}>
            <Text style={cancel_home_style.cancel_header}> You are able to modify your booking</Text>
        </View>
        <View style={cancel_home_style.cancel_info}>
            <Text style={cancel_home_style.cancel_text}>You may be charged a fee for cancelling the booking</Text>
        </View>
    </View>
)

const AcceptTerms = (props) => (
    <View style={cancel_home_style.accept_terms}>
        <View style={cancel_home_style.confirm_container}>
            <Text style={cancel_home_style.sub_heading}>You will be charged a fee of {props.fitness_center.price} at {props.fitness_center.name} completing 
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
const ConfirmCancellation = (props) => (
    <View style={cancel_home_style.confirm_cancellation}>
        <View style={cancel_home_style.confirm_container}>
            <Text style={cancel_home_style.title}>Confirm Cancellation</Text>
        </View>
        <View style={cancel_home_style.all_buttons}>
            
            <TouchableOpacity style={cancel_home_style.button_container}
                onPress={props.handleCancellation}>
                <Text style={cancel_home_style.button_text}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={cancel_home_style.button_container}
                onPress={props.handleCancellation}>
                <Text style={cancel_home_style.button_text}>Confirm</Text>
            </TouchableOpacity>
        </View>
    </View>

    
)