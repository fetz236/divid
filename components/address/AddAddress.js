import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { signup_style } from '../../styles/authentication/SignUpStyle'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

export default function AddAddress({navigation, ...props}) {

    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [addressCity, setAddressCity] = useState('')
    const [addressState, setAddressState] = useState('')
    const [addressCountry, setAddressCountry] = useState('')
    const [addressPostal, setAddressPostal] = useState('')

  return (
    <View>
        <View>
            <Address1 setAddress1={setAddress1}/>
            <Address2 setAddress2={setAddress2}/>
            <AddressCity setAddressCity={setAddressCity}/>
            <AddressState setAddressState={setAddressState}/>
            <AddressCountry setAddressCountry={setAddressCountry}/>
            <AddressPostal setAddressCountry={setAddressCountry}/>
        </View>
    </View>
  )
}


const Address1 = (props) =>(
    <View style={signup_style.signup_container}>
        <Text style={signup_style.sub_heading}> Address Line 1</Text>
        <View style={signup_style.input_container}>
            <TextInput autoCorrect={false}
            textContentType='streetAddressLine1'
            autoComplete='postal-address'
            style={signup_style.ti_container}
            onChangeText={text => props.setAddress1(text)}
            underlineColorAndroid='transparent'></TextInput>
        </View>
    </View>
)

const Address2 = (props) =>(
    <View style={signup_style.signup_container}>
        <Text style={signup_style.sub_heading}> Address Line 2</Text>
        <View style={signup_style.input_container}>
            <TextInput autoCorrect={false}
            textContentType='streetAddressLine2'
            autoComplete='postal-address-extended'
            style={signup_style.ti_container}
            onChangeText={text => props.setAddress2(text)}
            underlineColorAndroid='transparent'></TextInput>
        </View>
    </View>
)

const AddressCity = (props) =>(
    <View style={signup_style.signup_container}>
        <Text style={signup_style.sub_heading}> city name</Text>
        <View style={signup_style.input_container}>
            <TextInput autoCorrect={false}
            textContentType='addressCity'
            autoComplete='postal-address-locality'
            style={signup_style.ti_container}
            onChangeText={text => props.setAddressCity(text)}
            underlineColorAndroid='transparent'></TextInput>
        </View>
    </View>
)

const AddressState = (props) =>(
    <View style={signup_style.signup_container}>
        <Text style={signup_style.sub_heading}> state name</Text>
        <View style={signup_style.input_container}>
            <TextInput autoCorrect={false}
            textContentType='addressState'
            autoComplete='postal-address-region'
            style={signup_style.ti_container}
            onChangeText={text => props.setAddressState(text)}
            underlineColorAndroid='transparent'></TextInput>
        </View>
    </View>
)

const AddressCountry = (props) =>(
    <View style={signup_style.signup_container}>
        <Text style={signup_style.sub_heading}> country name</Text>
        <View style={signup_style.input_container}>
            <TextInput autoCorrect={false}
            textContentType='addressCountry'
            autoComplete='postal-address-country'
            style={signup_style.ti_container}
            onChangeText={text => props.setAddressCountry(text)}
            underlineColorAndroid='transparent'></TextInput>
        </View>
    </View>
)

const AddressPostal = (props) =>(
    <View style={signup_style.signup_container}>
        <Text style={signup_style.sub_heading}> postal code</Text>
        <View style={signup_style.input_container}>
            <TextInput autoCorrect={false}
            textContentType='addressCountry'
            autoComplete='postal-code'
            style={signup_style.ti_container}
            onChangeText={text => props.setAddressPostal(text)}
            underlineColorAndroid='transparent'></TextInput>
        </View>
    </View>
)

const CompleteAddress = (props) =>(
    <View style={signup_style.forgot_container_box}>
        <TouchableOpacity style={signup_style.touchable_opacity} 
            onPress={() => props.handleAddress()}>
            <Text style={signup_style.sub_heading_white}> make me an account </Text>
        </TouchableOpacity>
    </View>
)