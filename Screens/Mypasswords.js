import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet,Text, View, Button } from 'react-native';
import Mybutton from './Components/Mybutton';
import COLORS from './Constants';

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
    style={styles.myview}
    >

   

    <View style={styles.title}>
    <Text style={styles.titletxt}> {item.passwords_id} : {item.web_nameP}</Text>
    </View>
    
    <Text style={styles.mytext}>UserName : {item.usernameP}</Text>
    <Text style={styles.mytext}>Password: {item.passwordP}</Text>
    </View>)
})

  return (<View>
  <Text style={styles.heading}>My Passwords</Text>
  <Text > </Text>
  {DisplayData}
  <Text > </Text>
   <Mybutton 
   COLOR={COLORS.success}
   title='Add Password' customClick={()=>navigation.navigate ('add-new-password')}/>

   <Text > </Text>
   <Mybutton 
   COLOR={COLORS.warn}
   title='Edit Password' customClick={()=>navigation.navigate ('edit-password')}/>

   <Text > </Text>
   <Mybutton 
   COLOR={COLORS.danger}
   title='Delete Password' customClick={()=>navigation.navigate ('delete-password')}/>
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
    
    padding:5,
    margin:5,
    
  },
  mytext:{
    padding:5,
    border:"1px solid grey",
    fontWeight:500,
  },
  title:{
    // flex:1,
    // alignItems:'center',
    backgroundColor:'purple',
    padding:5,
   borderTopLeftRadius:5,
   borderTopRightRadius:5,
    
  },
  titletxt:{
    color:'white',
    fontWeight:600,
  }
})