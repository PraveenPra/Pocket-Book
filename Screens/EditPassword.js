import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View ,TextInput, Button,} from 'react-native';
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
import {DatabaseConnection} from '../database-connection'

const db=DatabaseConnection.getConnection()

export default function EditPassword({navigation}) {
    let [inputUserId, setInputUserId] = useState('');
  const [web_nameP, setWeb_nameP] = useState('')
  const [usernameP, setUsernameP] = useState('')
  const [passwordP, setPasswordP] = useState('')
  
  let updateAllStates = (name, contact, address) => {
    setWeb_nameP(web_nameP);
    setUsernameP(usernameP);
    setPasswordP(passwordP);
  };

  let searchUser = () => {
    console.log(inputUserId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM passwords_table where passwords_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          console.log(results.rows)
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.web_nameP,
              res.usernameP,
              res.passwordP
            );
          } else {
            alert('failed error');
            updateAllStates('', '', '');
          }
        }
      );
    });
  };

const updatepassword=()=>{
  db.transaction(function(tx) {
      tx.executeSql(
        'UPDATE passwords_table set web_nameP=?, usernameP=?, passwordP=? where passwords_id=?',
        [web_nameP,usernameP, passwordP,inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert(
              'Updated!!!'
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
  

  
  return (<View style={styles.myview}>
  <Text style={styles.heading}>Add New Password </Text>
  
  <TextInput style={styles.mytextinput}
  placeholder="search"
//   value={web_nameP}
  onChangeText={(inputUserId)=>setInputUserId(inputUserId)}
   /> 

<Button
title="search"
onPress={searchUser}
/>

   <TextInput style={styles.mytextinput}
  placeholder="Website/App name"
  value={web_nameP}
  onChangeText={(web_nameP)=>setWeb_nameP(web_nameP)}
   /> 
   
    <TextInput style={styles.mytextinput}
  placeholder="Username"
  value={usernameP}
  onChangeText={(usernameP)=>setUsernameP(usernameP)}
   /> 
   
    <TextInput style={styles.mytextinput}
  placeholder="Password"
  value={passwordP}
  onChangeText={(text)=>setPasswordP(text)}
   /> 
   
   <Button title='Update' style={styles.mybutton}
   onPress={()=>updatepassword()}
   />
 
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