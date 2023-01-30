import { Dimensions, StyleSheet } from 'react-native'

export const find_address_style = StyleSheet.create({
    main_container: {
        marginLeft:'3%',
    },
    search_bar_container: { 
        flexDirection: "row",
        marginRight:'3%',
    },
    google_places:{
        marginTop:'2%',
        width:'100%',
    },
    close_button: {
        marginLeft:'auto',
        right:0,
    },
    map_location_box:{
        height:Dimensions.get('window').height-Dimensions.get('window').height*0.3,
        width: Dimensions.get('window').width,
    },
    sub_heading_white:{
        color: 'white',
        fontSize:20,
        fontWeight:'400',
        marginTop:'1.5%',
    },
    add_address_box:{
        height:Dimensions.get('window').height-Dimensions.get('window').height*0.93,
        width: Dimensions.get('window').width,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#d95a00',
        backgroundColor:'#d95a00',
        
    },
});

