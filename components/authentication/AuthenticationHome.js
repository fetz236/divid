import React from 'react'
import { TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native'
import { View, Text } from 'react-native'
import { auth_style } from '../../styles/authentication/AuthenticationHomeStyle'
import Icon from 'react-native-vector-icons/Ionicons';

export default function AuthenticationHome({navigation, ...props}) {

    return (
            <>
                <Icon name="close" color='#d95a00' size={50} style={auth_style.close_button} 
                    onPress={()=> navigation.goBack()}
                />
                <SafeAreaView style={auth_style.safe_one_styll}>
                    
                    <View style={auth_style.lil_circle_backg}/>
                    <View style={auth_style.header_container}>
                        <Text style={auth_style.title}>divid</Text>
                        <Text style={auth_style.sub_heading}>living active</Text>
                        <Text style={auth_style.info_text}> Sign up or Login to continue</Text>
                    </View>
                    <View style={auth_style.circle_backg}>
                    </View>
                    <View style ={auth_style.auth_container}>
                            <View style={auth_style.auth_info}>
                                <TouchableOpacity
                                onPress={() => navigation.replace("LoginScreen", props.route.params)}>
                                    <Text style={auth_style.auth_header}>Login</Text>

                                </TouchableOpacity>
                                <TouchableOpacity style={{marginTop:'10%',}} 
                                onPress={() => navigation.replace("SignUpScreen",props.route.params)}>
                                    <Text style={auth_style.auth_header}>Sign Up</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                </SafeAreaView>
            </>
        )
}
