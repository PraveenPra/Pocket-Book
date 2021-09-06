import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Button,Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
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
  
const editpassword=()=>{
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
  

  
  return (<View style={styles.myview}>
  <Text style={styles.heading}>Add New Password </Text>
  
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