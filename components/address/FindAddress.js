import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { signup_style } from '../../styles/authentication/SignUpStyle'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { search_bar_css } from '../../styles/home/SearchBarStyle'
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps'
import { find_address_style } from '../../styles/address/FindAddressStyle'
import { MaterialCommunityIcons } from '@expo/vector-icons'


/*
    This stack acts as a screen to allow users to add addresses.
    It acts as a way similiar to the auth stack

    Uses google maps as it is similar to the search
*/

export default function FindAddress({navigation, ...props}) {

    const [pin, setPin] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })

    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0125,
        longitudeDelta: 0.0125,
    })


    //This method handles API requests to Google to ensure 
    const onLocationChange = (place_id) => {
        console.log(place_id)
    }

    const handleAddress = () => {
        console.log('handled')
    }

  return (
    <View>
        <View>
            <MaterialCommunityIcons name="close" color='#d95a00' size={50} style={find_address_style.close_button} 
                    onPress={()=> navigation.goBack()}
                />
            <WorkerLocations pin={pin} setPin={setPin} region={region} setRegion={setRegion}/>
        </View>

        <CompleteAddress handleAddress={handleAddress}/>
    </View>
  )
}

/*

This is a massive function that contains the rendering of the worker's location

*/
const WorkerLocations = (props) => (
    <View style={find_address_style.location_box}>
        <GooglePlacesAutocomplete 
        query = {{
            key: "AIzaSyCJA8aSLXA57dtUyybeMhyJ7vysZGdfs9Q",
            type:'geocode',
            radius:30000,
            location: `${props.region.latitude} , ${props.region.longitude}`
        }}
        minLength={3}
        fetchDetails={true}
        GooglePlacesSearchQuery={{
            rankby:'distance',
        }}
        filterReverseGeocodingByTypes={['postal_code']}
        onPress={(data, details=null) =>{
            props.setRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0125,
                longitudeDelta: 0.0125,
            })
            props.setPin({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
            })
        }}
        
        placeholder ="Search" 
        textInputProps={{
            placeholderTextColor: '#d95a00',
            returnKeyType: "search"
        }}
        styles={{
            container:{ flex: 0, position:'absolute', width:'100%', zIndex:1},
            listView:{backgroundColor:'white'},
            textInput:{
                backgroundColor: "white",
                borderRadius:20,
                fontWeight: "700",
                marginTop: 7,
                color:'#d95a00',
            }, 
            textInputContainer:{
                backgroundColor: "white",
                borderColor:'#d95a00',
                flexDirection: "row",
                alignItems: "center",
                color:'#d95a00',
            },    
        }}
        renderLeftButton = {() => (
            <View style={{marginLeft: 10}}>
                <Icon name="location-outline" size= {24} color='#d95a00'></Icon>
            </View>
        )}

        />
        <MapView
            
            style={find_address_style.map_location_box}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0125,
                longitudeDelta: 0.0125,
            }}
            provider='google'
            region={props.region}
            onRegionChange={(event) => {
                props.setPin({
                    latitude: event.latitude,
                    longitude: event.longitude,
                })
            }}
            onRegionChangeComplete={ (event) => {
                props.setRegion({
                    latitude: event.latitude,
                    longitude: event.longitude,
                    latitudeDelta: event.latitudeDelta,
                    longitudeDelta: event.longitudeDelta,
                })
            }}
            >
            <Marker coordinate={props.pin}/>
            
        </MapView>
        
    </View>

);

const CompleteAddress = (props) =>(
    <View style={signup_style.forgot_container_box}>
        <TouchableOpacity style={signup_style.touchable_opacity} 
            onPress={() => props.handleAddress()}>
            <Text style={signup_style.sub_heading_white}> make me an account </Text>
        </TouchableOpacity>
    </View>
)