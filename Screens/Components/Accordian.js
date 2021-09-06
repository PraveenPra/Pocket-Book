import React, {Component,useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Accordian(props){

    const [expanded,setExpanded]=useState(false)
    const [data,setData]=useState(props.data)
    

        // if (Platform.OS === 'android') {
        //     UIManager.setLayoutAnimationEnabledExperimental(true);
        // }
    
  
        const toggleExpand=()=>{
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setExpanded(!expanded)
          }
        
  

    return (
       <View>
            <TouchableOpacity style={styles.row} onPress={()=>toggleExpand()}>
                <Text style={[styles.title, styles.font]}>{props.title}</Text>
                <Icon name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={'white'} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                expanded &&
                <View style={styles.child}>
                    <Text style={styles.childtxt}>Username : {data[0]}</Text>    
                    <Text style={styles.childtxt}>Password : {data[1]}</Text>  
                </View>
            }
            
       </View>
    )
  }



const styles = StyleSheet.create({
    title:{
        fontSize: 20,
        fontWeight:'bold',
        color:'white',
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:40,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: 'indigo',
        borderTopLeftRadius:5,
   borderTopRightRadius:5,
    },
    parentHr:{
        height:1,
        color: 'white',
        width:'100%',
        // border:"1px solid violet",
    },
    child:{
        // backgroundColor: 'C9CCD5',
        // 
        // border:"1px solid purple",
        backgroundColor:'white'
    },
    childtxt:{
        border:"1px solid purple",
        paddingHorizontal:16,
        paddingVertical:8,
        color:'black',
        fontWeight:600,
        fontSize:16,
    }
    
});