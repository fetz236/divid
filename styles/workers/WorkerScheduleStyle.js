import { StyleSheet } from 'react-native'

export const schedule_style_sheet = StyleSheet.create({
    schedule_item_style: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10,
        marginLeft:20,
    },
    schedule_title_style:{
        fontSize:19,
        fontWeight:'600',    
    },
    date_time_style:{
        width: 100,
        alignItems:'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#d95a00',
    },
    course_container:{
        width:60,
        height:30,
        borderRadius:15,
        borderWidth:2,
        justifyContent:'center',
        alignItems:'center',
        marginRight:'2%',
        marginTop:'10%',
        backgroundColor:'#d95a00',
        borderColor:'#d95a00',
    },
    course_text:{
        color:'white',
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
    class_text:{
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
    worker_container:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:'4%',
        marginLeft:'4%',
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
    time_text_container:{
        marginTop:'5%',
        marginLeft:'5%',
    },
    time_text:{
        fontSize:20,
        fontWeight:'600',
        color:'#d95a00',
    },
});

