import { View, Text, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { booking_confirmation_style } from '../../styles/checkout/BookingConfirmationStyle'
import QRCode from 'react-native-qrcode-svg';


export default function BookingConfirmation() {

    //Initial Booking state
    const initialItemState ={
        name: 'Sugar',
        expiryDate: '2023-12-31',
        manufacturer: 'Kakira Sugar Estate'
      }
    
      const [item, setItem] = useState(initialItemState);
      const [productQRref, setProductQRref] = useState();
          
  return (
    <SafeAreaView>
         <BookingHeader/>
        <Divider style={booking_confirmation_style.divider}/>
        <BookingInformation/>
        <QR item={item} setProductQRref={setProductQRref}/>
    </SafeAreaView>
  )
}

const BookingHeader = () => (
    <View style={booking_confirmation_style.header_container}>
        <Text style={booking_confirmation_style.title}>Booking Confirmation</Text>
    </View>
)

const BookingInformation = () => (
    <View style={booking_confirmation_style.information_container}>
        <View style={booking_confirmation_style.information_info}>
            <Text style={booking_confirmation_style.sub_heading}> Your booking has been confirmed</Text>
        </View>
        <View style={booking_confirmation_style.information_info}>
            <Text style={booking_confirmation_style.sub_heading}> You can view details in the upcoming section</Text>
        </View>
    </View>
)

const QR = (props) => (
    <View style={booking_confirmation_style.qr_container}>
        <View style={booking_confirmation_style.information_info}>
            <QRCode 
                value={JSON.stringify({
                name: props.item.name,
                expiry: props.item.expiryDate,
                manufacturer: props.item.manufacturer
                })}
                size={250}
                getRef={(c) =>props.setProductQRref(c)}/>
        </View>
    </View>
)
