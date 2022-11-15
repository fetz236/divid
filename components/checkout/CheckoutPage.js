import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Button } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import { checkout_style } from '../../styles/checkout/CheckoutPageStyle'
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { auth, db } from '../../firebase'


/*

Object {
  "cl": "4vY771DMIX7422rzWW7l",
  "class_selected": Object {
    "class": Object {
      "categories": Array [
        "Abw5hySlBsbHvcKN4vM9",
      ],
      "closed_days": Array [
        Object {
          "date": "2022-10-20",
          "fc": "jP6AalbtPcjk0Lbcxo5q",
          "id": "7HVQgA4ZlmcYuyolvdmc",
        },
        Object {
          "date": "2022-11-01",
          "fc": "jP6AalbtPcjk0Lbcxo5q",
          "id": "UlD3xq7xZvNNpHGjmbey",
        },
      ],
      "curr_cap": "0",
      "description": "Advanced Spinning class",
      "id": "4vY771DMIX7422rzWW7l",
      "image": "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2Fclass_images%2F20220923135655c.jpg?alt=media&token=26f06243-25ac-4c8b-af9c-ef9dec5d06c7",
      "max_cap": 25,
      "name": "Spinning",
      "price": 8000,
    },
    "fc": Object {
      "categories": Array [
        "q9TU23VcpJh1YeyBNlU9",
        "1PVAG7I7cTnxNZqCMehW",
      ],
      "id": "jP6AalbtPcjk0Lbcxo5q",
      "image": Array [
        "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003536.jpg?alt=media&token=63bf024e-396d-4655-aced-a10149ded044",
        "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003535.jpg?alt=media&token=4366df23-90f9-4af6-a47e-9bcd305af10b",
        "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003233.jpg?alt=media&token=269cbc10-7a49-48d4-8fc3-2a7ef2cdb69b",
        "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003433.jpg?alt=media&token=846b35a2-9b61-4fad-a335-97c81c4cbc90",
        "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003400.jpg?alt=media&token=b0ecdd9d-3de5-40ca-9810-9212044e6d49",
        "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003335.jpg?alt=media&token=0d9bd9e2-af1c-49fc-a645-2960becd05c7",
        "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003333.jpg?alt=media&token=4b0b0c3a-c409-4d29-8a0e-583794d2f29c",
      ],
      "location": Object {
        "latitude": 51.51435857837156,
        "longitude": -0.15710420123305274,
      },
      "name": "The Gym Way - Marble Arch",
      "rating": 5,
      "reviews": 1,
      "subscription": "red",
      "telephone_number": "+442076294655",
    },
  },
  "date": "27/10/2022",
  "id": "gyTAF32tfRORwlc5hKpo",
  "time": "14:00 - 15:30",
}
Object {
  "cl": "4vY771DMIX7422rzWW7l",
  "class_selected": Object {
    "class": Object {
      "categories": Array [
        "Abw5hySlBsbHvcKN4vM9",
      ],
      "closed_days": Array [
        Object {
          "date": "2022-10-20",
          "fc": "jP6AalbtPcjk0Lbcxo5q",
          "id": "7HVQgA4ZlmcYuyolvdmc",
        },
        Object {
          "date": "2022-11-01",
          "fc": "jP6AalbtPcjk0Lbcxo5q",
          "id": "UlD3xq7xZvNNpHGjmbey",
        },
      ],
      "curr_cap": "0",
      "description": "Advanced Spinning class",
      "id": "4vY771DMIX7422rzWW7l",
      "image": "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2Fclass_images%2F20220923135655c.jpg?alt=media&token=26f06243-25ac-4c8b-af9c-ef9dec5d06c7",
      "max_cap": 25,
      "name": "Spinning",
      "price": 8000,
    },
    "fc": Object {
      "categories": Array [
        "q9TU23VcpJh1YeyBNlU9",
        "1PVAG7I7cTnxNZqCMehW",
      ],
      "id": "jP6AalbtPcjk0Lbcxo5q",
      "image": Array [
        "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003536.jpg?alt=media&token=63bf024e-396d-4655-aced-a10149ded044",
        "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003535.jpg?alt=media&token=4366df23-90f9-4af6-a47e-9bcd305af10b",
        "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003233.jpg?alt=media&token=269cbc10-7a49-48d4-8fc3-2a7ef2cdb69b",
        "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003433.jpg?alt=media&token=846b35a2-9b61-4fad-a335-97c81c4cbc90",
        "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003400.jpg?alt=media&token=b0ecdd9d-3de5-40ca-9810-9212044e6d49",
        "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003335.jpg?alt=media&token=0d9bd9e2-af1c-49fc-a645-2960becd05c7",
        "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/store_images%2FjP6AalbtPcjk0Lbcxo5q%2F20220921003333.jpg?alt=media&token=4b0b0c3a-c409-4d29-8a0e-583794d2f29c",
      ],
      "location": Object {
        "latitude": 51.51435857837156,
        "longitude": -0.15710420123305274,
      },
      "name": "The Gym Way - Marble Arch",
      "rating": 5,
      "reviews": 1,
      "subscription": "red",
      "telephone_number": "+442076294655",
    },
  },
  "date": "27/10/2022",
  "id": "gyTAF32tfRORwlc5hKpo",
  "time": "14:00 - 15:30",
}


*/

const API_URL = "https://serene-taiga-13771.herokuapp.com";

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

    useEffect(async() => {
        const loadUserInfo = () => {
            db.collection('users').doc(auth.currentUser.uid).get().then(
                snap => {
                    setUserData(snap.data())
                }
            )

        }
    
        if (user_data == ""){
            await loadUserInfo()
            if (props.route.params.u_data){
                setCheckoutData(props.route.params.u_data)
                setisWorker(false, "false")
            }
            else{
                setCheckoutData(props.route.params.t_data)
                setisWorker(true)

                
            }
            setLoadedUserData(true)

        }
        
    }, [])
    
    const fetchPaymentIntentClientSecret = async () => {
        let price; 
        if (isWorker==true){
            price = props.route.params.t_data.worker_selected.worker.price
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
              billingDetails: billingDetails,
            });
            if (error) {
              alert(`Payment Confirmation Error ${error.message}`);
            } else if (paymentIntent) {
                if (isWorker){
                    db.collection('bookings').add({
                        class: '',
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
    <>
        <View style={checkout_style.header_container}>
            <Text style={checkout_style.sub_heading}>{props.checkout_data.worker_selected.worker.first_name} {props.checkout_data.worker_selected.worker.last_name} Booking</Text>
        </View>
        <Divider width={1} style={checkout_style.divider}/>
        <View style ={checkout_style.order_container}>
            <Text style={checkout_style.order_header}> Order </Text>
            <Divider width={1} style={checkout_style.order_divider}/>
            <View style={checkout_style.order_info}>
                <Text style={checkout_style.order_text}>Personal training session from {props.checkout_data.start_time} - {props.checkout_data.end_time} on  
                 the {props.checkout_data.date}
                </Text>
            </View>
            <Divider width={1} style={checkout_style.order_divider}/>
        </View>
    </>
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