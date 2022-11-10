
import { StyleSheet } from 'react-native'

export const auth_style = StyleSheet.create({
    safe_one_styll:{
        marginTop:'10%',
    },
    header_container: {
        alignItems:'center',
        marginTop:"5%",
        flexDirection:'column',
        justifyContent:'center',
    },
    title:{
        color: '#d95a00',
        fontSize:50,
        fontWeight:'600',

    },
    sub_heading:{
        color: '#d95a00',
        fontSize:16,
        fontWeight:'400',
        marginTop:'2%',
    },
    info_text:{
        fontSize: 14,
        color: '#8d8d8d',
        marginTop:'2%',
    },
    lil_circle_backg:{
        height:200,
        width:200, 
        borderRadius:100,
        backgroundColor:'#d95a00',
        marginLeft:'auto',
        right:-100,
        position:'absolute',
    },  
    circle_backg:{
        height:750,
        width:750, 
        borderRadius:375,
        backgroundColor:'#d95a00',
        marginRight:'auto',
        left:-375,
        position:'absolute',
        marginTop: 250,
    }, 
    auth_container:{
        marginTop:'80%',
    },
    auth_header:{
        fontSize:20,
        fontWeight:'600', 
        color: 'white'
    },
    auth_info:{
        marginTop:'3%',
        marginLeft:'-3%',
        marginBottom:'1%',
        alignItems:'center',
        justifyContent:'center',
    },
    auth_text:{
        fontSize:16,
        color: 'white'
    },
    close_button: {
        marginLeft:'auto',
        right:0,
    },
});

