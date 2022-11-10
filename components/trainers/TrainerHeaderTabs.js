import React, {useState} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { header_tabs_css } from '../../styles/home/HeaderTabsStyle';
import {HomeStackScreen } from '../../navigation'

export default function TrainerHeaderTabs({navigation}, props) {
    const [activeTab, setActiveTab] = useState("Trainers");
    return (
        <View style={{flexDirection: "row" , alignSelf: "center" }}>
            {/* */}
            <HeaderButton 
                text="Gyms" 
                btnColor= "#d95a00" 
                textColor ="white" 
                activeTab = {activeTab} 
                navigation = {navigation}
                setActiveTab = {setActiveTab}
                page = "Home"
            />
            <HeaderButton 
                text="Trainers" 
                btnColor= "white" 
                textColor ="#d95a00" 
                activeTab = {activeTab} 
                navigation = {navigation}
                setActiveTab = {setActiveTab}
                page = "TrainerHome"
            />
        </View>
    )
}

const HeaderButton = (props) => (
    <View>
        <TouchableOpacity style={{
            backgroundColor: props.activeTab === props.text ? "#d95a00" : "white", 
            paddingVertical: 6,
            paddingHorizontal: 16,
            borderRadius: 30,
        }}
        onPress={() => 
            {
                props.navigation.goBack();

            }
        }
        >
            <Text style = {{
                color: props.activeTab === props.text ? "white" : '#d95a00', 
                fontSize: 15, 
                fontWeight: '500'
            }}>{props.text}</Text>
        </TouchableOpacity>
    </View>
    
); 