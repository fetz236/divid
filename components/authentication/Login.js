import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { View, Text } from 'react-native'
import { login_style } from '../../styles/authentication/LoginStyle'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Modal } from 'react-native'
import { auth, db } from '../../firebase'
import { doc, getDoc } from 'firebase/firestore'

export default function Login({navigation, ...props}) {
    const [loginState, setLoginState] = useState('');
    const [passwordState, setPasswordState] = useState('');


    const handleLogin = () => {
        auth
        .signInWithEmailAndPassword(loginState, passwordState)
        .then(userCredentials => {
            if(props.route.params.isCheckout){
                navigation.replace("Checkout", props.route.params);
            }
            else{
                navigation.replace("UserDetail", props.route.params);
            }
            
        })
        .catch(error => alert(error.message))
    };

    return (

        <SafeAreaView>
            <Icon name="close" color='#d95a00' size={50} style={login_style.close_button} 
                onPress={()=> navigation.goBack()}
            />
            <View style={login_style.header_container}>
                <Text style={login_style.title}> divid </Text>
            </View>
            <Divider style={login_style.divider}/>
            <View style={login_style.login_container}>
                <Text style={login_style.sub_heading}> email </Text>
                <View style={login_style.input_container}>
                    <TextInput autoCorrect={false}
                    autoCapitalize='none'
                    textContentType='emailAddress'
                    autoComplete='email'
                    value = {loginState}
                    onChangeText ={text => setLoginState(text)}
                    style={login_style.ti_container}
                    underlineColorAndroid='transparent'></TextInput>
                </View>
            </View>
            <View style={login_style.login_container}>
                <Text style={login_style.sub_heading}> password </Text>
                <View style={login_style.input_container}>
                    <TextInput autoCorrect={false}
                    autoCapitalize='none'
                    textContentType='password'
                    autoComplete='password'
                    value={passwordState}
                    secureTextEntry={true}
                    onChangeText ={text => setPasswordState(text)}
                    style={login_style.ti_container}
                    underlineColorAndroid='transparent'></TextInput>
                </View>
            </View>
            <View style={login_style.forgot_container}>
                <TouchableOpacity onPress={() => navigation.replace("ForgotPasswordScreen" , {
                    navigation:navigation,
                })}>
                    <Text style={login_style.sub_heading}> i forgot my password </Text>
                </TouchableOpacity>
            </View>
            <View style={login_style.forgot_container}>
                <TouchableOpacity onPress={() => navigation.replace("SignUpScreen" , {
                    navigation:navigation,
                })}>
                    <Text style={login_style.sub_heading}> i actually dont have an account </Text>
                </TouchableOpacity>
            </View>
            <View style={login_style.forgot_container_box}>
                <TouchableOpacity style={login_style.touchable_opacity} 
                    onPress={handleLogin}>
                    <Text style={login_style.sub_heading_white}> login </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    )
}
