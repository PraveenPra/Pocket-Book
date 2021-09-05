import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet, Flatlist,Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {DatabaseConnection} from '../database-connection'

const db=DatabaseConnection.getConnection();

export default function Mypasswords({ navigation }) {
const [flatListItems,setFlatListItems]=useState([])

useEffect(() => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM passwords_table',
          [],
      (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      }
    );
  });
}, []);

/*
let listItemView = (item) => {
    return (
      <View
        key={item}
        style={{ backgroundColor: '#EEE', marginTop: 20, padding: 30, borderRadius: 10 }}>
       
        <Text >item</Text>
    <Text>name</Text>
        <Text >itemh</Text>
    <Text>contact</Text>
        <Text>itemj</Text>
        </View>
)}*/

console.log(flatListItems[0])
alert(flatListItems[0])

  return (<View>
  <Text style={styles.heading}>My Passwords</Text>
  { /*
   <Flatlist 
   data={flatListItems}
   keyExtractor={(item, index)=>index.toString()}
   renderItem={({item})=>listItemView(item)}/>*/}
   
   <Button title='add new password' onPress={()=>navigation.navigate ('add-new-password')}/>
   
  </View>)
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 20,
    color: 'indigo',
    fontWeight: '900',
    borderBottom: '2px grey solid',

  },
  p: {
    padding: 10,
    fontSize: 10,
  },
})