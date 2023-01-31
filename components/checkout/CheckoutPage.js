import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import { checkout_style } from '../../styles/checkout/CheckoutPageStyle'
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { auth, db } from '../../firebase'


//API URL for our Express server
const API_URL = "https://serene-taiga-13771.herokuapp.com";

//Checkout Page presented to the user which is wrapped in StripeProvider
export default function CheckoutPage({navigation, ...props}) {
    
    const [checkout_data, setCheckoutData] = useState()
    const [isWorker, setisWorker] = useState()
    const [user_data, setUserData] = useState('')
    const [loaded_user_data, setLoadedUserData] = useState(false)

    const [changeState, setChangeState] = useState(false);

    const changePayment = () => {
        setChangeState(true);
    };


    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment, loading } = useConfirmPayment();

    useEffect(() => {
        const loadUserInfo = () => {
            db.collection('users').doc(auth.currentUser.uid).get().then(
                snap => {
                    setUserData(snap.data())
                }
            )

        }
    
        loadUserInfo()
        if (props.route.params.u_data){
            setCheckoutData(props.route.params.u_data)
            setisWorker(false, "false")
        }
        else{
            setCheckoutData(props.route.params.w_data)
            setisWorker(true)

            
        }
        setLoadedUserData(true)
    }, [])
    
    const fetchPaymentIntentClientSecret = async () => {
        let price; 
        if (isWorker==true){
            price = props.route.params.w_data.worker_selected.worker.price
        }
        else{
            price = props.route.params.u_data.class_selected.class.price
            
        }

        const response = await fetch(`${API_URL}/create-payment-intent`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body:JSON.stringify({price: price}),

      });
      const { clientSecret, error } = await response.json();
      return { clientSecret, error };
    };

    const handlePayPress = async () => {
        //1.Gather the customer's billing information (e.g., email)
        if (!cardDetails?.complete) {
          alert("Please enter Complete card details");
          return;
        }
        const billingDetails = {
          email: auth.currentUser.email,
        };
        //2.Fetch the intent client secret from the backend
        try {
          const { clientSecret, error } = await fetchPaymentIntentClientSecret();
          //2. confirm the payment
          if (error) {
            alert("Unable to process payment");
          } else {
            const { paymentIntent, error } = await confirmPayment(clientSecret, {
              type: "Card",
              paymentMethodType:'Card',
              billingDetails: billingDetails,
            });
            if (error) {
              alert(`Payment Confirmation Error ${error.message}`);
            } else if (paymentIntent) {
                if (isWorker){
                    db.collection('bookings').add({
                        class: '',
                        status: 'pending',
                        date: checkout_data.date,
                        start_time: checkout_data.start_time,
                        end_time: checkout_data.end_time,
                        fc: '',
                        reference_number: generateString(10),
                        location: checkout_data.worker_selected.worker.location,
                        name: "Personal Worker session with "+ checkout_data.worker_selected.worker.first_name
                        + checkout_data.worker_selected.worker.last_name,
                        telephone_number: checkout_data.worker_selected.worker.mobile_calling_code + checkout_data.worker_selected.worker.mobile,
                        worker: checkout_data.worker_selected.worker.id,
                        user: auth.currentUser.uid
                    })
                }
                else{
                    db.collection('bookings').add({
                        class: checkout_data.cl,
                        status: 'pending',
                        date: checkout_data.date,
                        start_time: checkout_data.start_time,
                        end_time: checkout_data.end_time,
                        fc: checkout_data.class_selected.fc.id,
                        location: checkout_data.class_selected.fc.location,
                        name: checkout_data.class_selected.class.name  + " Class Booking at " + checkout_data.class_selected.fc.name,
                        reference_number: generateString(10),
                        telephone_number: checkout_data.class_selected.fc.telephone_number,
                        worker: '',
                        user: auth.currentUser.uid
                    })
                }
                
              alert("Payment Successful");
              
            }
          }
        } catch (e) {
          alert(e);
        }
      };


    const generateString = (length) => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    };


    return (
        <SafeAreaView>
            {
                loaded_user_data && !isWorker &&  
                <>
                    <Information checkout_data={checkout_data}/>
                    <Payment confirmPayment={confirmPayment} changePayment={changePayment} setCardDetails={setCardDetails} 
                    navigation={navigation}/>
                    { 
                        changeState && <ChangePayment/>
                    }
                    <Confirmation handlePayPress={handlePayPress}/>
                </>
            }
            {
                loaded_user_data && isWorker &&  
                <>
                    <WorkerInformation checkout_data={checkout_data}/>
                    <Payment confirmPayment={confirmPayment} changePayment={changePayment} setCardDetails={setCardDetails} 
                    navigation={navigation}/>
                    { 
                        changeState && <ChangePayment/>
                    }
                    <Confirmation handlePayPress={handlePayPress}/>
                </>
            }
        </SafeAreaView>

    )
}


const Information = (props) => (
    <>
        <View style={checkout_style.header_container}>
            <Text style={checkout_style.sub_heading}>{props.checkout_data.class_selected.fc.name}</Text>
        </View>
        <Divider width={1} style={checkout_style.divider}/>
        <View style ={checkout_style.order_container}>
            <Text style={checkout_style.order_header}> Order </Text>
            <Divider width={1} style={checkout_style.order_divider}/>
            <View style={checkout_style.order_info}>
                <Text style={checkout_style.order_text}>{props.checkout_data.class_selected.class.name} class
                 at {props.checkout_data.start_time} - {props.checkout_data.end_time} on  
                 the {props.checkout_data.date}
                </Text>
            </View>
            <Divider width={1} style={checkout_style.order_divider}/>
        </View>
    </>
)

const WorkerInformation = (props) => (
  <View style ={checkout_style.order_container}>
      <Text style={checkout_style.order_header}> Order </Text>
      <Divider width={1} style={checkout_style.order_divider}/>
      <View style={checkout_style.order_info}>
          <Text style={checkout_style.order_text}> Booking with {props.checkout_data.worker_selected.worker.first_name} {props.checkout_data.worker_selected.worker.last_name} arriving from {props.checkout_data.start_time} - {props.checkout_data.end_time} on  
            the {props.checkout_data.date} {props.checkout_data.selected_hour}
          </Text>
      </View>
      <Divider width={1} style={checkout_style.order_divider}/>
  </View>
)
    
const Order = (props) => (
    <View style ={checkout_style.perks_container}>
        <View>
            <Text style={checkout_style.perks_header}> Add Perks </Text>
        </View>
        <Divider width={1} style={checkout_style.perks_divider}/>
        <View style={checkout_style.perks_info}>
            <Text style={checkout_style.perks_subheader}>No Worker</Text>
            <TouchableOpacity>
                <Text style={checkout_style.perks_text}>Add a Worker</Text>
            </TouchableOpacity>
        </View>
        <View style={checkout_style.perks_info}>
            <Text style={checkout_style.perks_subheader}>divid perks</Text>
            
            <TouchableOpacity onPress={() => props.navigation.navigate('ViewPerks')}>
                <Text style={checkout_style.perks_text}>Add a Perk</Text>
            </TouchableOpacity>
        </View>
        <Divider width={1} style={checkout_style.perks_divider}/>
    </View>
)

const Payment = (props) => (
    <View style ={checkout_style.payment_container}>
        <View style={checkout_style.payment_header_info}>
            <Text style={checkout_style.payment_header}> Payment </Text>
            { /*
            <TouchableOpacity style={checkout_style.payment_change}
            onPress={() => props.navigation.navigate("ChangePayment")}>
                <Text style={checkout_style.payment_change_text}> Change Payment method </Text>
            </TouchableOpacity> */
            }
        </View>
        <View style={checkout_style.payment_info}>

            <CardField
                postalCodeEnabled={false}
                placeholders={{
                number: '1234 5678 9012 3456',
                }}
                cardStyle={{
                backgroundColor: '#d8d8d8',
                textColor: '#d95a00',
                }}

                style={{
                width: '100%',
                height: 50,
                marginTop:'2%',
                marginBottom:'40%',
                backgroundColor: 'transparent',
                }}
                onCardChange={(cardDetails) => {
                    props.setCardDetails(cardDetails)
                }}
            />
        </View>
    </View>
)

const Confirmation = (props) => (
    <View style={checkout_style.button_container}>
        <Button title="Pay now" color="white" onPress={props.handlePayPress}/>
    </View>
)

const ChangePayment = () => (
    <View style={checkout_style.change_payment_container}>
        <Text style={checkout_style.payment_text}>Select Payment</Text>
    </View>
)