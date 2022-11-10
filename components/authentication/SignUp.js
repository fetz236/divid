import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { View, Text } from 'react-native'
import { signup_style } from '../../styles/authentication/SignUpStyle'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, db, storage } from '../../firebase'
import {doc, setDoc} from 'firebase/firestore'
import { getDownloadURL, ref } from "firebase/storage";
import MultiSelect from 'react-native-multiple-select'
import PhoneInput from "react-native-phone-number-input";

const categories = require('../../categories.json');


export default function SignUp({navigation, ...props}) {

    const [f_name, setF_name] = useState('');
    const [l_name, setL_name] = useState('');
    const [email, setEmailState] = useState('');
    const [mobile, setMobile] = useState('');
    const [mobileCountry, setMobileCountry] = useState('GB');
    const [mobileCountryCallingCode, setMobileCountryCallingCode] = useState('44');

    const [passwordState, setPasswordState] = useState('');

    const [url, setUrl] = useState('')

    useEffect(() => {
        const getProfileImage = async() =>{
            const profile_image_ref = ref(storage,`gs://fit-user-app/profile_images/user.png/`);
            await getDownloadURL(profile_image_ref).then(
                (x) => {
                    setUrl(x)
                }
            )
        }
        if (url == '') { getProfileImage()}
    }, [])

    const handleSignUp = async() => {
        await auth
        .createUserWithEmailAndPassword(email, passwordState)
        .then(userCredentials => {
            const user = userCredentials.user;
            const id = user.uid;
            
            //user.sendEmailVerification();
            setDoc(doc(db, "users", id), {
                rating: 5,
                reviews:1,
                isTrainer: false,
                categories: selectedItems,
                first_name: checkFName(f_name),
                last_name: checkLName(l_name),
                mobile: mobile,
                mobile_country: mobileCountry,
                mobile_calling_code: mobileCountryCallingCode,
                email: email,
                favourites: [],
                photoURL: "https://firebasestorage.googleapis.com/v0/b/fit-user-app/o/profile_images%2Fuser.png?alt=media&token=6a36bfe8-9305-450e-926d-a39d31195be7"
            });
            user.updateProfile({
                displayName: checkFName(f_name) + " " + checkLName(l_name),
                photoURL: url,
            }).then(function() {
                // Profile updated successfully!
                if(props.route.params.isCheckout){
                    navigation.replace("Checkout", props.route.params);
                }
                else{
                    navigation.replace("UserDetail", {
                        navigation:navigation,
                    });
                }
                 
                
              }, function(error) {
                alert(error.message);
            });
                
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`${errorCode}: ${errorMessage}`)
        })
    };

    const checkFName = (first) => {
        const res = first.trim();
        return res
    };

    const checkLName = (last) => {
        const res = last.trim();
        return res
    };


    const [selectedItems, setSelectedItems] = useState([]);

    const onSelectedItemsChanged = (selected) => {
        setSelectedItems(selected)
    };

    return (
        <SafeAreaView>
            <Icon name="close" color='#d95a00' size={50} style={signup_style.close_button} 
                onPress={()=> navigation.goBack()}
            />
            <View style={signup_style.header_container}>
                <Text style={signup_style.title}> divid </Text>
            </View>
            <Divider style={signup_style.divider}/>
            <FirstName setF_name={setF_name}/>
            <LastName setL_name={setL_name}/>
            <Mobile setMobile={setMobile} setMobileCountry={setMobileCountry} setMobileCountryCallingCode={setMobileCountryCallingCode}/>
            <Email setEmailState = {setEmailState}/>
            <Password setPasswordState = {setPasswordState}/>
            <Interests selectedItems={selectedItems} onSelectedItemsChanged={onSelectedItemsChanged}/>
            <View style={signup_style.forgot_container}>
                <TouchableOpacity onPress={() => navigation.replace("LoginScreen" , {
                    navigation:navigation,
                })}>
                    <Text style={signup_style.sub_heading}> i actually have an account </Text>
                </TouchableOpacity>
            </View>
            <View style={signup_style.forgot_container_box}>
                <TouchableOpacity style={signup_style.touchable_opacity} 
                    onPress={() => handleSignUp()}>
                    <Text style={signup_style.sub_heading_white}> make me an account </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const FirstName = (props) =>(
    <View style={signup_style.signup_container}>
        <Text style={signup_style.sub_heading}> first name</Text>
        <View style={signup_style.input_container}>
            <TextInput autoCorrect={false}
            textContentType='givenName'
            autoComplete='name-given'
            style={signup_style.ti_container}
            onChangeText={text => props.setF_name(text)}
            underlineColorAndroid='transparent'></TextInput>
        </View>
    </View>
)

const LastName = (props) =>(
    <View style={signup_style.signup_container}>
        <Text style={signup_style.sub_heading}> last name</Text>
        <View style={signup_style.input_container}>
            <TextInput autoCorrect={false}
            textContentType='familyName'
            autoComplete='name-family'
            style={signup_style.ti_container}
            onChangeText={text => props.setL_name(text)}
            underlineColorAndroid='transparent'></TextInput>
        </View>
    </View>
)

const Email = (props) =>(
    <View style={signup_style.signup_container}>
        <Text style={signup_style.sub_heading}> email </Text>
        <View style={signup_style.input_container}>
            <TextInput autoCorrect={false}
            autoCapitalize='none'
            textContentType='emailAddress'
            autoComplete='email'
            style={signup_style.ti_container}
            onChangeText={text => props.setEmailState(text)}
            underlineColorAndroid='transparent'></TextInput>
        </View>
    </View>
)

const Mobile = (props) =>(
    <View style={signup_style.signup_container}>
        <Text style={signup_style.sub_heading}> mobile </Text>
        <View>  
            <View style={signup_style.input_container}>
                <PhoneInput 
                defaultCode='GB'
                onChangeCountry={text => {
                        props.setMobileCountryCallingCode(text.callingCode[0])
                        props.setMobileCountry(text.cca2)
                    }
                }
                onChangeText={text => props.setMobile(text)}
                containerStyle={{
                    backgroundColor:'transparent',
                }}
                codeTextStyle={{
                    backgroundColor:'transparent',
                }}
                textContainerStyle={{
                    backgroundColor:'transparent',
                }}
                />

            </View>
        </View>
    </View>
)

const Password = (props) => (
    <View style={signup_style.signup_container}>
        <Text style={signup_style.sub_heading}> password </Text>
        <View style={signup_style.input_container}>
            <TextInput autoCorrect={false}
            autoCapitalize='none'
            textContentType='newPassword'
            autoComplete='password-new'
            secureTextEntry={true}
            style={signup_style.ti_container}
            onChangeText={text => props.setPasswordState(text)}
            underlineColorAndroid='transparent'></TextInput>
        </View>
    </View>
)

const Interests = (props) => (
    <View style={signup_style.signup_container}>
        <Text style={signup_style.sub_heading}> interests </Text>
        <View style={signup_style.multi_input_container}>
            <MultiSelect items ={categories}
            uniqueKey='__id__'
            onSelectedItemsChange={props.onSelectedItemsChanged}
            selectedItems={props.selectedItems}
            selectText='Pick categories'
            searchInputPlaceholderText='Search Categories'
            tagRemoveIconColor='#d95a00'
            searchInputStyle={{
                height:50,
                width:'80%',
                backgroundColor:'transparent',
            }}
            styleDropdownMenu={{
                height:50,
                backgroundColor:'transparent',
                borderColor:'#d95a00',
                borderRadius:20,
                borderWidth:1,

            }}
            styleDropdownMenuSubsection={{
                backgroundColor:'transparent',
                borderColor:'#d95a00',
                marginLeft:'3%',
                marginRight:'3%',
                borderBottomColor:'transparent',

            }}
            styleIndicator={{
                backgroundColor:'transparent',
            }}
            styleInputGroup={{
                backgroundColor:'transparent',
                borderColor:'#d95a00',
                borderRadius:20,
                borderWidth:1,
            }}
            styleItemsContainer={{
                backgroundColor:'transparent',
            }}
            styleListContainer={{
                backgroundColor:'transparent',
            }}
            styleMainWrapper={{
                backgroundColor:'transparent',
            }}
            styleRowList={{
                backgroundColor:'transparent',
            }}
            styleSelectorContainer={{
                backgroundColor:'transparent',
            }}
            styleTextDropdown={{
                backgroundColor:'transparent',

            }}
            styleTextDropdownSelected={{
                backgroundColor:'transparent',
            }}
            tagBorderColor='#d95a00'
            tagTextColor='#d95a00'
            selectedItemIconColor='#d95a00'
            selectedItemTextColor='#d95a00'
            itemTextColor='#d95a00'
            displayKey='name'
            submitButtonColor='#d95a00'
            submitButtonText='Submit'

            removeSelected 
            />
        </View>
    </View>
)