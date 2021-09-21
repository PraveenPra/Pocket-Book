import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React,{useState,useLayoutEffect,useEffect} from 'react';
import { StyleSheet, Text, View ,TextInput, Button,} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {DatabaseConnection} from '../database-connection'

const db=DatabaseConnection.getConnection()

export default function EditPassword({route,navigation}) {

  const { id } = route.params;
  console.log(id)

    // let [inputUserId, setInputUserId] = useState('');
  const [web_nameP, setWeb_nameP] = useState('')
  const [usernameP, setUsernameP] = useState('')
  const [passwordP, setPasswordP] = useState('')
  
 

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM passwords_table where passwords_id = ?',
        [id],
        (tx, results) => {
                  var len = results.rows.length;
                  console.log(results.rows)
                  if (len > 0) {
                    let res = results.rows.item(0);
                  
                    setWeb_nameP(res.web_nameP);
                    setUsernameP(res.usernameP);
                    setPasswordP(res.passwordP);
                  } else {
                    alert('failed error');
                    updateAllStates('', '', '');
                  }
                })
    });
  }, []);
  // let searchUser = () => {
  //   console.log(inputUserId);
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'SELECT * FROM passwords_table where passwords_id = ?',
  //       [inputUserId],
  //       //lets get id from selection instead of searching
  //       // [id],
  //       (tx, results) => {
  //         var len = results.rows.length;
  //         console.log(results.rows)
  //         if (len > 0) {
  //           let res = results.rows.item(0);
  //           updateAllStates(
  //             res.web_nameP,
  //             res.usernameP,
  //             res.passwordP
  //           );
  //         } else {
  //           alert('failed error');
  //           updateAllStates('', '', '');
  //         }
  //       }
  //     );
  //   });
  // };

const updatepassword=()=>{
  db.transaction(function(tx) {
      tx.executeSql(
        'UPDATE passwords_table set web_nameP=?, usernameP=?, passwordP=? where passwords_id=?',
        [web_nameP,usernameP, passwordP,id],
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
  <Text style={styles.heading}>Edit Password </Text>
  
{/* 
<Button
title="search"
onPress={searchUser}
/> */}

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
    

  },
  myview:{
    padding: 10,
    // border:'2px solid grey',
    borderWidth:1,
        borderColor:'grey',
    borderRadius:5,
    margin:10,
  },
  mytextinput:{
    padding:10,
    margin:30,
    // border:'2px solid grey',
    borderWidth:1,
        borderColor:'grey',
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