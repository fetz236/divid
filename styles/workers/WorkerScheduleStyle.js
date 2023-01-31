import { StyleSheet } from 'react-native'

export const schedule_style_sheet = StyleSheet.create({
    hours_style:{
        width:'50%',
        flexDirection:'row',
        alignSelf:'center',
        alignContent:'center',
        justifyContent:'center',
        textAlign:'center',
        marginBottom:'5%',
    },
    hours_text:{
        marginTop:'7%',
        fontSize:'16',
        marginRight:'5%',
    },
    main_container:{
        marginTop:'2%',
        marginBottom:'2%',
        marginLeft:'2%',
        marginRight:'2%',
        width:'95%',
        height:150,
        borderColor:'#d95a00',
    },
    date_container:{
        marginTop:'3%',
        marginBottom:'1%',
        marginLeft:'2%',
    },
    date_text_underline:{
        fontSize: 20,
        color:'#d95a00',
        fontWeight:'600',
    },
    date_text:{
        fontSize: 20,
        color:'#d95a00',
        fontWeight:'600',
    },
    book_button:{
        backgroundColor:'#d95a00',
        borderRadius:20,
        height:40,
        width:'80%',
        alignItems:'center',
        justifyContent:'center',
    },
    time_container:{
        marginTop:'2%',
        marginBottom:'2%',
        marginLeft:'2%',
        marginRight:'2%',
        width:'45%',
        borderColor:'#d95a00',
    },
    item_container:{
        flexDirection:'row',
        marginTop:'3%',
    },
});

