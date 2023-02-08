import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { contact_preferences_style } from '../../styles/userDetail/ContactPreferencesStyle'
import { CheckBox } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function ContactPreferences() {

    // Contact Preferences for the user by mobile and email format
    const [email_accepted, setEmailAccepted] = useState(true)
    const [mobile_accepted, setMobileAccepted] = useState(true)

  return (
    <View style={contact_preferences_style.main_container}>
        <ContactPreferencesBody/>
        <ContactCheck email_accepted={email_accepted} setEmailAccepted={setEmailAccepted} 
        mobile_accepted={mobile_accepted} setMobileAccepted={setMobileAccepted}
        />
    </View>
  )
}

const ContactPreferencesBody = () => (
    <View>
        <View style={contact_preferences_style.body_container}>
            <Text style={contact_preferences_style.title}>Contact Information</Text>  
        </View>
        <View style={contact_preferences_style.body_container}>
            <Text style={contact_preferences_style.sub_heading}>You can edit and change any contact 
            preferences in this section</Text>
        </View>
        <View style={contact_preferences_style.body_container}>
            <Text style={contact_preferences_style.sub_heading}>Please note emails for receipts and other
            necessary information will be continued to be sent</Text>
        </View>
    </View>

)

const ContactCheck = (props) => (
    <View style={contact_preferences_style.main_input_container}>
        <Text style={contact_preferences_style.title}>Edit Details</Text> 
        <View style={contact_preferences_style.checkmark_container}>
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
                title={"Contact via Email"}
                checked={props.email_accepted}
                onPress={()=> props.setEmailAccepted(!props.email_accepted)}>
            </CheckBox>
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
                title={"Contact via Mobile"}
                checked={props.mobile_accepted}
                onPress={()=> props.setMobileAccepted(!props.mobile_accepted)}>
            </CheckBox>
        </View>
        <TouchableOpacity style={contact_preferences_style.button_container}>
                <Text style={contact_preferences_style.white_title}>Safe</Text>
        </TouchableOpacity>
    </View>
)