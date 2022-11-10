import React, { useEffect, useState } from 'react'
import { Linking, TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { auth, db } from '../../firebase';
import { upcoming_style_sheet } from '../../styles/upcoming/UpcomingStyle';
import NoLogin from '../userDetail/NoLogin';



export default function Upcoming({navigation}) {
    

    const [bookings, setBookings] = useState([])
    const [loaded_bookings, setLoadedBookings] = useState(false)
    
    useEffect(async () => {
        
        const loadBookings = () =>{
            let booking_data = []
            db.collection('bookings').where('user', '==', auth.currentUser.uid).get()
            .then(snapshot => 
                snapshot.forEach(doc => {
                    const data = doc.data();
                    data.id = doc.id
                    booking_data.push(data)
                })
            ).then(function(){
                setBookings(booking_data)
                setLoadedBookings(true)
            }
            ).catch(err => alert(err))

        }

        auth.onAuthStateChanged( async function(){
            if (auth.currentUser){
                setLoadedBookings(false)
                await loadBookings()
            }
            else{
                setBookings([])
                setLoadedBookings(false)   
            }
        })
      
    }, [])

    
    const grouped_bookings = Object.values(bookings.reduce((acc, item) => {
        if (!acc[item.date]) acc[item.date] = {
            date: item.date,
            data: []

        };
        acc[item.date].data.push({
            name: item.name,
            start_time: item.start_time,
            end_time: item.end_time,
            name: item.name,
            location: item.location,
            reference_number: item.reference_number,
            telephone_number: item.telephone_number,
            trainer: item.trainer,
            fc: item.fc,
            class: item.class,
            user: item.user,
        });
        return acc;
    }
    , {}))



    return (
        
        <View>
            {loaded_bookings && 
            <>
                <BookingHeader/>
                {grouped_bookings.map((booking,index) => (
                    <View key={index}>

                        <Divider style={upcoming_style_sheet.divider_date}/>
                        <View style={upcoming_style_sheet.date_header}>
                            <Text style={upcoming_style_sheet.sub_heading}>{booking.date}</Text>
                        </View>
                        {booking.data.map((value,j_index) => (
                            <View key={j_index}>
                                <Divider style={upcoming_style_sheet.divider_date}/>
                                <UpcomingBookings key={index} navigation={navigation} booking={value}/>
                            </View>
                        ))}   
                    </View>
                ))}
            </>
            }
            {!loaded_bookings && 
                <NoLogin/>
            }
        </View>
    )
}

const BookingHeader = () => (
    <View style={upcoming_style_sheet.header_container}>
        <Text style={upcoming_style_sheet.title}>Upcoming Bookings</Text>
    </View>
);

const UpcomingBookings = (props) => (
    <View style={upcoming_style_sheet.main_container}>
        <InfoHeader booking={props.booking}/>

        <View style={upcoming_style_sheet.display_buttons}>
            <UpcomingButtons name="Contact" booking={props.booking}/>
            <UpcomingQR navigation={props.navigation} name="Check Location" booking={props.booking}/>
        </View>
    </View>
);


const InfoHeader= (props) => (
    <View style = {upcoming_style_sheet.info_container}>
        <View style={upcoming_style_sheet.wrap_text}>
            <View style={upcoming_style_sheet.space_text}>
                <Text style={upcoming_style_sheet.sub_heading_button}>{props.booking.start_time} - {props.booking.end_time}</Text>
            </View>
            <View style={upcoming_style_sheet.space_text}>
                <Text style={upcoming_style_sheet.sub_heading_button}>{props.booking.reference_number} </Text>
            </View>
            <View style={upcoming_style_sheet.space_text}>
                <Text style={upcoming_style_sheet.sub_heading_button}>{props.booking.name} </Text>
            </View>

        </View>
    </View>
);
const UpcomingButtons = (props) => (
    <TouchableOpacity style={upcoming_style_sheet.btn_container} onPress={()=> {
        Linking.openURL(`tel:${props.booking.telephone_number}`)
    }}>
        <View>
            <Text style={upcoming_style_sheet.btn_text}> {props.name} </Text>
        </View>
    </TouchableOpacity>

);

const UpcomingQR = (props) => (
    <TouchableOpacity style={upcoming_style_sheet.btn_container} onPress= {
        () => {
            const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
            const latLng = `${props.booking.location.latitude},${props.booking.location.longitude}`;
            const label = 'Custom Label';
            const url = Platform.select({
                ios: `${scheme}${label}@${latLng}`,
                android: `${scheme}${latLng}(${label})`
                });
            Linking.openURL(url);
        }
    } >
        <View>
            <Text style={upcoming_style_sheet.btn_text}> {props.name} </Text>
        </View>
    </TouchableOpacity>

);

const UpcomingNavigationButtons = (props) => (
    <TouchableOpacity style={upcoming_style_sheet.btn_container} onPress= {
        () => props.navigation.navigate(props.name)
    } >
        <View>
            <Text style={upcoming_style_sheet.btn_text}> {props.name} </Text>
        </View>
    </TouchableOpacity>
);