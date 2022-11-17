import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from 'react-native';
import { View } from 'react-native'
import { general_info_css } from '../../styles/home/GeneralInfoStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {auth} from '../../firebase'

const logo = {image : require('../../assets/divid.png')};

export default function GeneralInfo({ navigation, ...props }) {

    const checkAuthentication = () => {
        
        if (auth.currentUser) {
            navigation.navigate("UserDetail", {
                navigation:navigation,
            })
        } else {
            navigation.navigate("AuthenticationScreen", {
                navigation:navigation,
                isCheckout: false
            })
        }
        
    };
    return (
        <View source={general_info_css.gi_container}>
            <Logo navigation={navigation}/>
            <View style={general_info_css.profile_container}>
                <TouchableOpacity
                    onPress={() => checkAuthentication()}>
                        

                    <Icon name="person-outline" size={35} color='#d95a00'></Icon>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}


const Logo = (props) => (
    <TouchableOpacity style={general_info_css.logo_container}
    onPress={() => props.navigation.navigate("AddAddressScreen")}>
        <Image source ={logo.image} style={general_info_css.logo_def}/>
    </TouchableOpacity>
);
