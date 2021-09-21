import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import Mybutton from './Components/Mybutton';
import { DatabaseConnection } from '../database-connection';
import Accordian from './Components/Accordian';

const db = DatabaseConnection.getConnection();

const BG = '#94cdff';
const BGL = "#c2ffff";
const BGD = "#668db0";

export default function Homescreen({navigation}){
  const RADIUS = 10;
  useEffect(() => {
    db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='passwords_table'",
        [],
        function(tx, res) {
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS passwords_table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS passwords_table(passwords_id INTEGER PRIMARY KEY AUTOINCREMENT,web_nameP VARCHAR(255),usernameP VARCHAR(50),passwordP VARCHAR(255))',
    []);
          }
        });
    });
  
  }, []);
  
  return (<View style={styles.page}>
  <Text style={styles.heading}>Home</Text>

  <Text > </Text>

  <View style={[styles.morphTop,{borderRadius: RADIUS}]}>
            <View style={[styles.morphBottom,{borderRadius: RADIUS}]}>
                {/* <View style={[styles.morph,{borderRadius: RADIUS}]}> */}
   <Mybutton 
    title='My Passwords' COLOR='#94cdff' customClick={()=>navigation.navigate('my-passwords')}/>
   {/* </View> */}
   </View>
   </View>
   
   <Text > </Text>
   
  </View>)
}

const styles=StyleSheet.create({
  page:{
    backgroundColor: '#94cdff',
    flex:1,
    alignItems:"center",
    // justifyContent:"center",
  },
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
    // morph
    morph: {
      // border:'1px solid #FFE8E8',
      borderWidth:1,
        borderColor:'#FFE8E8',
  },
  morphTop: {
    width:300,
      shadowOffset: {
          width: -5,
          height: -5,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
      shadowColor: BGL,
  },

  morphBottom: {
    width:300,
      shadowOffset: {
          width: 5,
          height: 5,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      shadowColor: BGD,
      // borderWidth:1
  }
})