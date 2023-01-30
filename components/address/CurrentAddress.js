import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { current_address_style } from '../../styles/address/CurrentAddressStyle'
import { auth_style } from '../../styles/authentication/AuthenticationHomeStyle'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { auth, db } from '../../firebase'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function CurrentAddress({navigation, ...props}) {

  // Used to store addresses and load page
  const [addresses, setAddresses] = useState([])
  const [isActiveLoaded, setIsActiveLoaded] = useState(false)

  //Use effect loads data into current addresses
  useEffect(() => {
    const loadAddresses = () => {
      let address_data = []
      //We query for the address subcollection in the user's doc data
      db.collection(`users/${auth.currentUser.uid}/address`).get()
      .then(snapshot => {
          snapshot.forEach(doc => {
              const data = doc.data();
              data.id = doc.id
              address_data.push(data)
          })
      }).then(function(){
          setAddresses(address_data)
      }
      ).catch(err => alert(err))
    }
    
    loadAddresses()
    setIsActiveLoaded(true)
  
  }, [])
  
  //sets new active address
  const makeActive = (item) =>{

    /*
      Gets all docs with active = true, expected value is always one doc
      The doc is then set to false

      Once all have been selected the item passed will be set to true in the database

      New active address is set
    */

    if(!item.isActive){
      db.collection(`users/${auth.currentUser.uid}/address`).where('isActive', '==', true).get()
      .then((snapshot) => {
          snapshot.forEach(doc => {
            doc.ref.update({
              isActive: false,
            })
          })
        })
        .then(
          db.collection(`users/${auth.currentUser.uid}/address`).doc(item.id).update({
            isActive:true,
          })).then(
            navigation.goBack()
          )
        .catch((error) => {
          alert(`Error found: ${error}! Please contact support`)
        })
      .catch((error) => {
        alert(`Error found: ${error}! Please contact support`)
      })

    }    
  }

  //Render page

  return (
    <>
    { isActiveLoaded &&
      <View style={current_address_style.main_container}>
        <MaterialCommunityIcons name="close" color='#d95a00' size={50} style={auth_style.close_button} 
                  onPress={()=> navigation.goBack()}
              /> 

        {addresses.map((item, index) => (
          <View key={index}>
            <DisplayCurrentAddresses item={item} makeActive={makeActive}/>
          </View>
        ))}
        <AddNewAddress navigation={navigation}/>
      </View>
      }
    </>
  )
}

//Used to build current addresses
const DisplayCurrentAddresses = (props) => (
  <TouchableOpacity style={{
    marginTop:'5%',
    height:Dimensions.get('window').height/10,
    borderRadius:25,
    marginRight:'3%',
    width:'94%',
    borderColor: props.item.isActive ? '#d95a00' : '#d8d8d8',
    borderWidth:2,
  }}
  onPress={()=> props.makeActive(props.item)}
  >
    <View style={current_address_style.dca_info}>
      {
        props.item.isActive && <Text style={current_address_style.dca_info_active}>Active address</Text>
      }
    </View>

    <View style={current_address_style.dca_info}>
      <Text style={current_address_style.dca_info_text}>{props.item.address1}, {props.item.address2}, {props.item.postcode}</Text>
    </View>
  </TouchableOpacity>
)

const AddNewAddress = (props) => (
  <TouchableOpacity style={current_address_style.ana_box}
    onPress={() => props.navigation.replace('FindAddressScreen')}
  >
    <Text style={current_address_style.ana_text}> Add New </Text>
  </TouchableOpacity>
)