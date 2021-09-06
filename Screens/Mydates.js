import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Flatlist,Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {DatabaseConnection} from '../database-connection'

const db=DatabaseConnection.getConnection();

export default function Mydates({ navigation }) {
const [flatListItems,setFlatListItems]=useState([])

useEffect(() => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM passwords_table',
          [],
      (tx, results) => {
        // console.log(results.rows[1])
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      }
    );
  });
}, []);

const DisplayData=flatListItems.map((item,index)=>{
  console.log(item)
  return (<View 
    key={index}
    style={styles.myview}>
    <Text style={styles.mytext}>Website Name : {item.web_nameP}</Text>
    <Text style={styles.mytext}>UserName : {item.usernameP}</Text>
    <Text style={styles.mytext}>Password: {item.passwordP}</Text>
    </View>)
})

  return (<View>
  <Text style={styles.heading}>My Dates</Text>
  <Text > </Text>
  {DisplayData}
  <Text > </Text>
   <Button title='Add Dates' onPress={()=>navigation.navigate ('add-new-password')}/>
   
  </View>)
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 20,
    color: 'indigo',
    fontWeight: '900',
   

  },
  p: {
    padding: 10,
    fontSize: 10,
  },
  myview:{
    border:"2px solid pink",
    padding:5,
    margin:5,
    backgroundColor:'pink'
  },
  mytext:{
    
    border:"1px solid grey",
    
  }
})