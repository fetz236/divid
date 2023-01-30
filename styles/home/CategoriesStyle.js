import { StyleSheet } from 'react-native'

export const categories_css = StyleSheet.create({
    categories_container: {
        marginTop:5,
        backgroundColor: "white",
        paddingVertical: 10,
        paddingLeft: 15,
    },
    item_container:{
        alignItems:'center',
        marginRight:20
    },
    image_def:{
        fontSize:30,
        color:'#d95a00',
    },
    text_def:{
        fontSize: 14,
        color:'#d95a00',
        fontWeight:"600"
    },
    reload:{
        alignItems:'center',
        justifyContent:'center',
    },
    reload_button:{
        backgroundColor:'#d95a00',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
    },
    white_subheading:{
        color:'white',
        fontSize:16,
        fontWeight:'600',
        marginLeft:'3%',
        marginRight:'3%',
        marginTop:'1.5%',
        marginBottom:'1.5%',
    },
});

