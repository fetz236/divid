
import { StyleSheet } from 'react-native'

export const cancel_home_style = StyleSheet.create({
    header_container: {
        alignItems:'center',
        marginTop:"5%",
        flexDirection:'column',
        justifyContent:'space-between',
    },
    title:{
        color: '#d95a00',
        fontSize:20,
        fontWeight:'600',

    },
    sub_heading:{
        color: '#8d8d8d',
        fontSize:16,
        fontWeight:'400',
    },
    divider:{
        marginTop:'5%',
        marginBottom:'5%',
        color:'#a2a2a2',
    },
    cancel_container:{
        marginTop:'10%',
        marginLeft:'3%',
        marginRight:'3%',
        alignItems:'center',
        justifyContent:'center',
    },
    cancel_header:{
        fontSize:20,
        fontWeight:'600', 
        color: '#d95a00'
    },
    cancel_info:{
        marginTop:'5%',
        marginBottom:'1%',
        alignItems:'center',
        justifyContent:'center',
    },
    cancel_text:{
        fontSize:16,
        fontWeight:'600',    
        color: '#8d8d8d'
    },
    cancel_divider:{
        marginTop:'2%',
        marginBottom:'2%',
        color:'#a2a2a2',
        marginLeft:'-3%',
    },
    accept_terms:{
        borderWidth:2,
        borderRadius:50,
        borderColor:'#d95a00',
        marginTop:'15%',
        marginLeft:'3%',
        marginRight:'3%',
    },
    confirm_cancellation:{
        borderWidth:2,
        borderRadius:50,
        borderColor:'#d95a00',
        marginLeft:'3%',
        marginRight:'3%',
    },
    confirm_container:{
        marginTop:'10%',
        marginLeft:'3%',
        marginRight:'3%',
        alignItems:'center',
        justifyContent:'center',
    },
    all_buttons:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginTop:'10%',
        marginBottom:'10%',
        marginLeft:'3%',
        marginRight:'3%',
    },
    button_container:{
        marginTop:'10%',
        marginBottom:'10%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#d95a00",
        borderRadius:50,
        borderWidth:5,
        borderColor:'#d95a00',
    },
    button_text:{
        color:'white',
        fontSize:20,
        marginLeft:'3%',
        marginRight:'3%',
        marginTop:'3%',
        marginBottom:'3%',
    }
});

