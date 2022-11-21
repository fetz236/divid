import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as ReduxProvider } from 'react-redux'
import store from "./redux/Store"
import configureStore from './redux/Store'
import WorkerHome from './screens/HomePage/WorkerHome'
import WorkerScheduleDetail from './screens/HomePage/WorkerScheduleDetail'
import WorkerDetail from './screens/HomePage/WorkerDetail'
import UserDetail from './screens/HomePage/UserDetail'
import Search from './screens/SearchPage/SearchHome';
import UpcomingHome from './screens/UpcomingPage/UpcomingHome';
import Icon from 'react-native-vector-icons/Ionicons';
import Checkout from './screens/HomePage/Checkout';
import ChangePayment from './components/checkout/ChangePayment';
import AuthenticationScreen from './screens/Authentication/AuthenticationScreen';
import LoginScreen from './screens/Authentication/LoginScreen';
import SignUpScreen from './screens/Authentication/SignUpScreen';
import ForgotPasswordScreen from './screens/Authentication/ForgotPasswordScreen';
import Modify from './screens/UpcomingPage/Modify';
import Cancel from './screens/UpcomingPage/Cancel';
import BookingConfirmation from './components/checkout/BookingConfirmation';
import AccountDetailsScreen from './screens/HomePage/AccountDetailsScreen';
import ContactPreferencesScreen from './screens/HomePage/ContactPreferencesScreen';
import PaymentDetailsScreen from './screens/HomePage/PaymentDetailsScreen';
import ReferUserScreen from './screens/HomePage/ReferUserScreen';
import NoLogin from './components/userDetail/NoLogin';
import DisplayCategoriesScreen from './screens/SearchPage/DisplayCategoriesScreen';
import { header_style } from './styles/components/HeaderStyle';
import AddAddressScreen from './screens/Address/AddAddressScreen';
import FindAddressScreen from './screens/Address/FindAddressScreen';
import CurrentAddressScreen from './screens/Address/CurrentAddressScreen';
import LoginAddressNeededScreen from './screens/Address/LoginAddressNeededScreen';

const tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SearchStack = createStackNavigator();
const UpcomingStack = createStackNavigator();

const config_transition = {
    animation: 'timing',
    config: {
      duration:0,
    },
  };

const HomeStackScreen = () => (
    <HomeStack.Navigator screenOptions={{
        headerShown:false,

    }}>
        <HomeStack.Screen name="WorkerHome" component={WorkerHome} options={{animationEnabled:false}}/>
        <HomeStack.Screen name = "WorkerDetail" component={WorkerDetail} options={{headerShown:true, 
            headerStyle:header_style.full_container, headerBackTitleVisible:false, 
            headerTitleStyle:header_style.title, headerTintColor: 'white',headerTitle:''
            }}/>
        <HomeStack.Screen name = "WorkerScheduleDetail" component={WorkerScheduleDetail} options={{headerShown:true, 
            headerStyle:header_style.full_container, headerBackTitleVisible:false, 
            headerTitleStyle:header_style.title, headerTintColor: 'white', headerTitle:'Select Date'
            }}/>
        <HomeStack.Screen name = "UserDetail" component={UserDetail} options={{headerShown:true, 
            headerStyle:header_style.full_container, headerBackTitleVisible:false, 
            headerTitleStyle:header_style.title, headerTintColor: 'white', headerTitle:''
            }}/>
        <HomeStack.Screen name = "AccountDetailsScreen" component={AccountDetailsScreen} options={{headerShown:true, 
            headerStyle:header_style.full_container, headerBackTitleVisible:false, 
            headerTitleStyle:header_style.title, headerTintColor: 'white', headerTitle:' Account Details'
            }}/>
        <HomeStack.Screen name = "PaymentDetailsScreen" component={PaymentDetailsScreen} options={{headerShown:true, 
        headerStyle:header_style.full_container, headerBackTitleVisible:false, 
        headerTitleStyle:header_style.title, headerTintColor: 'white', headerTitle:'Payment Methods'
            }}/>
        <HomeStack.Screen name = "ContactPreferencesScreen" component={ContactPreferencesScreen} options={{headerShown:true, 
            headerStyle:header_style.full_container, headerBackTitleVisible:false, 
            headerTitleStyle:header_style.title, headerTintColor: 'white', headerTitle:' Contact Preferences'
            }}/>
        <HomeStack.Screen name = "ReferUserScreen" component={ReferUserScreen} options={{headerShown:true, 
            headerStyle:header_style.full_container, headerBackTitleVisible:false, 
            headerTitleStyle:header_style.title, headerTintColor: 'white', headerTitle:' Refer a Friend'
            }}/>
        <HomeStack.Screen name = "Checkout" component={Checkout} options={{headerShown:true, 
            headerStyle:header_style.full_container, headerBackTitleVisible:false, 
            headerTitleStyle:header_style.title, headerTintColor: 'white', headerTitle:' Checkout'
            }}/>
        <HomeStack.Screen name = "ChangePayment" component={ChangePayment} options={{headerShown:true, 
            headerStyle:header_style.full_container, headerBackTitleVisible:false, 
            headerTitleStyle:header_style.title, headerTintColor: 'white', headerTitle:' Change Payment'
            }}/>
        <HomeStack.Screen name = "AuthenticationScreen" component={AuthenticationScreen} options={{ presentation:'modal'}}/>
        <HomeStack.Screen name = "LoginScreen" component={LoginScreen} options={{ presentation:'modal', transitionSpec:{open:config_transition, close:config_transition}, animationEnabled:true}}/>
        <HomeStack.Screen name = "SignUpScreen" component={SignUpScreen} options={{ presentation:'modal', transitionSpec:{open:config_transition, close:config_transition}, animationEnabled:true}}/>
        <HomeStack.Screen name = "ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ presentation:'modal', transitionSpec:{open:config_transition, close:config_transition}, animationEnabled:true}}/>
        <HomeStack.Screen name = "AddAddressScreen" component={AddAddressScreen} options={{ presentation:'modal'}}/>
        <HomeStack.Screen name = "FindAddressScreen" component={FindAddressScreen} options={{ presentation:'modal'}}/>
        <HomeStack.Screen name = "CurrentAddressScreen" component={CurrentAddressScreen} options={{ presentation:'modal'}}/>
        <HomeStack.Screen name = "LoginAddressNeededScreen" component={LoginAddressNeededScreen} options={{ presentation:'modal'}}/>
        
    </HomeStack.Navigator>

)

const SearchStackScreen = () => (
    <SearchStack.Navigator screenOptions={{
        headerShown:false,
    }}>
        <SearchStack.Screen name="SearchPage" component={Search}/>
        <SearchStack.Screen name = "DisplayCategoriesScreen" component={DisplayCategoriesScreen} options={{headerShown:true, 
            headerStyle:header_style.full_container, headerBackTitleVisible:false, 
            headerTitleStyle:header_style.title, headerTintColor: 'white', headerTitle:'Fitness Centres'
            }}/>

    </SearchStack.Navigator>
)

const UpcomingStackScreen = () => (
    <UpcomingStack.Navigator screenOptions={{
        headerShown:false,
    }}>
        <UpcomingStack.Screen name="UpcomingHome" component={UpcomingHome}/>
        <UpcomingStack.Screen name="Modify" component={Modify} options={{headerShown:true, 
            headerStyle:header_style.full_container, headerBackTitleVisible:false, 
            headerTitleStyle:header_style.title, headerTintColor: 'white', headerTitle:'Modify Booking'
            }}/>
        <UpcomingStack.Screen name="Cancel" component={Cancel} options={{headerShown:true, 
            headerStyle:header_style.full_container, headerBackTitleVisible:false, 
            headerTitleStyle:header_style.title, headerTintColor: 'white', headerTitle:'Cancel Booking'
            }}/>
        <UpcomingStack.Screen name = "NoLogin" component={NoLogin}/>
        <UpcomingStack.Screen name = "BookingConfirmation" component={BookingConfirmation}/>
    </UpcomingStack.Navigator>
)


export default function RootNavigation() {
    const store = configureStore();
    

    return (
        <ReduxProvider store={store}>
            <NavigationContainer>
                <tab.Navigator screenOptions={{
                    headerShown:false,
                    tabBarActiveTintColor:"white",
                    tabBarInactiveTintColor:"white",
                    tabBarActiveBackgroundColor:"#d95a00",
                    tabBarInactiveBackgroundColor:"#d95a00",
                    tabBarStyle:{
                        height:'10%',
                        backgroundColor:'#d95a00',
                        marginTop:'1%'
                    }
                }}
                >
                    <tab.Screen name="Home" component={HomeStackScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home" color={color} size={size} />
                          ),
                    }}
                    />
                    <tab.Screen name="Search" component={SearchStackScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="search" color={color} size={size} />
                          ),
                    }}
                    />
                    <tab.Screen name="Upcoming" component={UpcomingStackScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="calendar" color={color} size={size} />
                          ),
                    }}
                    />
                </tab.Navigator>

            </NavigationContainer>
        </ReduxProvider>
    )
}
