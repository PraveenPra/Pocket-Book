import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import Mybutton from './Components/Mybutton';
import { DatabaseConnection } from '../database-connection';

const db = DatabaseConnection.getConnection();


export default function Homescreen({navigation}){
  
  useEffect(() => {
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='passwords_table'",
        [],
        function(tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS passwords_table(passwords_id INTEGER PRIMARY KEY AUTOINCREMENT,web_nameP VARCHAR(255),usernameP VARCHAR(50),passwordP VARCHAR(255))',
    []);
          }
        });
    });
  
  }, []);
  
  return (<View>
  <Text style={styles.heading}>Home</Text>
  <Text > </Text>
   <Mybutton 
   COLOR='blue' title='My Passwords' customClick={()=>navigation.navigate('my-passwords')}/>
   <Text > </Text>
   <Mybutton 
   COLOR='red'
   title='My Notes' customClick={()=>navigation.navigate('my-notes')}/>

   <Text > </Text>
   <Mybutton 
   COLOR='green'
   title='My Dates' customClick={()=>navigation.navigate('my-dates')}/>
  </View>)
}

const styles=StyleSheet.create({
  heading: {
    textAlign:'center',
    fontSize:20,
    color:'indigo',
    fontWeight:'900',
    
    
  },
  p:{
    padding:10,
    fontSize:10,
  },
})