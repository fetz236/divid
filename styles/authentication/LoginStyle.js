
import { StyleSheet } from 'react-native'

export const login_style = StyleSheet.create({
    header_container: {
        alignItems:'center',
        marginTop:"5%",
        flexDirection:'column',
        justifyContent:'space-between',
    },
    title:{
        color: '#d95a00',
        fontSize:50,
        fontWeight:'600',
    },
    sub_heading:{
        color: '#d95a00',
        fontSize:20,
        fontWeight:'600',
        marginLeft:'1%',
        marginBottom:'2%',
    },
    divider:{
        marginTop:'2%',
        marginBottom:'2%',
        color:'#a2a2a2',
    },
    login_container:{
        marginTop:'10%',
        marginLeft:'3%',
    },
    input_container:{
        height:50,
        marginRight:'3%',
        borderRadius:30,
        borderWidth:1,
        borderColor:'#d95a00',
    },
    ti_container:{
        height:'95%',
        width:'95%',
        marginLeft:'3%',
        marginRight:'3%',
        fontSize:16,    
    },
    forgot_container:{
        marginTop:'10%',
        alignSelf:'center',
        justifyContent:'center',
    },
    close_button: {
        marginLeft:'auto',
        right:0,
    },
    forgot_container_box:{
        marginTop:'10%',
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2,
        borderRadius:50,
        borderColor:'#d95a00',
        backgroundColor:'#d95a00',
        marginBottom:'10%',
    },
    touchable_opacity:{
        marginLeft:'2.5%',
        marginRight:'2.5%',
        marginTop:'2%',
        marginBottom:'2%',
    },
    sub_heading_white:{
        color: 'white',
        fontSize:20,
        fontWeight:'600',
        marginLeft:'1%',
        marginBottom:'2%',
    },
});

