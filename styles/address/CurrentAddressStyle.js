import { Dimensions, StyleSheet } from 'react-native'

export const current_address_style = StyleSheet.create({
    main_container: {
        marginLeft:'3%',
    },
    dca_info_active:{
        fontWeight:'800',
        color:'#d95a00'
    },
    dca_info:{
        marginLeft:'3%',
        marginRight:'3%',
        marginTop:'2%',
        flexDirection:'row',
        flexWrap:1,
    },
    dca_info_text:{
        fontSize:14,
        textAlign:'center'
    },
    screen_container:{
        backgroundColor:'white'
    },
    ana_box:{
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'10%',
        height:Dimensions.get('window').height/20,
        width:'30%',
        borderColor:'#d95a00',
        backgroundColor:'#d95a00',
        borderWidth:2,
        borderRadius:50,
    },
    ana_text:{
        color:'white',
        fontSize:20,
        fontWeight:'600',
        
    },
    close_button: {
        marginLeft:'auto',
        right:0,
    },
});

