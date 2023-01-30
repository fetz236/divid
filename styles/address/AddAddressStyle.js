import { Dimensions, StyleSheet } from 'react-native'

export const add_address_style = StyleSheet.create({
    main_container: {
        marginLeft:'3%',
    },
    header:{
        flexDirection:'row',
    },  
    search_bar_container: { 
        flexDirection: "row",
        marginRight:'3%',
    },
    google_places:{
        marginTop:'2%',
        width:'100%',
    },
    back_button: {
        marginRight:'auto',
        left:0,
    },
    close_button: {
        marginLeft:'auto',
        right:0,
    },
    map_location_box:{
        height:Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
});

