
import { StyleSheet } from 'react-native'

export const about_sheet = StyleSheet.create({
    about_full_container: {
        marginTop:10,
        padding:15,
        backgroundColor: "white"
    },
    about_category:{
        flexDirection:'row',
        marginTop:'3%',
        marginLeft:'3%',
        width:'47%',
    },
    opening_hours:{
        flexDirection:'column',
        marginTop:'3%',
        marginLeft:'2%',
        width:'47%',
    },
    wo_item:{
        padding:'0.5%',
        
    },
    about_cd_backg:{
        backgroundColor:'red',
        left:0,
        right:0,
        marginTop:'2%',
        marginBottom:'2%',
    },
    about_alert_view:{
        marginTop:'2%',
        marginBottom:'2%',
    },
    wo_text:{
        color:'#8d8d8d',
    },
    about_img:{
        width:"92%",
        height:180,  
        marginTop:30,
    },
    about_title:{
        color:'#d95a00',
        fontSize:29,
        fontWeight:"600",
        marginTop: 10,
        marginHorizontal:15,
    },
    about_desc:{
        color:'#8d8d8d',
        fontSize:15.5,
        fontWeight:"400",
        marginTop:10,
        marginHorizontal: 15,
    }
});


