import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,{useState,useLayoutEffect,useEffect} from 'react';
import { StyleSheet, Text, View ,TextInput, Button,Pressable} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {DatabaseConnection} from '../database-connection'


export default function AddNewPassword({navigation}) {

  const [web_nameP, setWeb_nameP] = useState('')
  const [usernameP, setUsernameP] = useState('')
  const [passwordP, setPasswordP] = useState('')
  
  
const db=DatabaseConnection.getConnection()

 
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

const addpassword=()=>{
  db.transaction(function (tx) {
      tx.executeSql(
        
        'INSERT INTO passwords_table (web_nameP, usernameP, passwordP) VALUES (?,?,?)',
        [web_nameP,usernameP, passwordP],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert(
              'Saved!!!'
              /*,[
                {
                  text: 'bekey',
                  onPress: () =>navigation.replace('Home'),
                },
              ],
              { cancelable: true }*/
            );
          return  navigation.replace('my-passwords')
          } else alert('Failed to save !!!');
        }
      );
    });
  }
  
//home button
useLayoutEffect(() => {
  navigation.setOptions({
    headerRight:()=>(<TouchableOpacity style={{marginRight:20}} 
    onPress={()=>navigation.navigate('Home')}>
      <FontAwesome name="home" size={24} color="black" />
    </TouchableOpacity>)
  })
}, [])
  
  return (<View style={styles.myview}>
  <Text style={styles.heading}>Add New Password </Text>
  <Text > </Text>
   <TextInput style={styles.mytextinput}
  placeholder="Website/App name"
  value={web_nameP}
  onChangeText={(text)=>setWeb_nameP(text)}
   /> 
   
    <TextInput style={styles.mytextinput}
  placeholder="Username"
  value={usernameP}
  onChangeText={(text)=>setUsernameP(text)}
   /> 
   
    <TextInput style={styles.mytextinput}
  placeholder="Password"
  value={passwordP}
  onChangeText={(text)=>setPasswordP(text)}
   /> 
   
   <Button title='Save' style={styles.mybutton}
   onPress={()=>addpassword()}
   />
 
  </View>)
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 20,
    color: 'indigo',
    fontWeight: '900',
    

  },
  myview:{
    padding: 10,
    border:'2px solid grey',
    borderRadius:5,
    margin:10,
  },
  mytextinput:{
    padding:10,
    margin:30,
    border:'2px solid grey',
    borderRadius:5,
    minWidth: 200,
      
  },
  mybutton:{
     width:200,
     height: 40,
     backgroundColor:'orange',
     margin:50,
     flex:1,
     alignItems:'center',
     justifyContent:'center'
  },
})