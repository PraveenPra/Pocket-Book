import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, Button, Alert} from 'react-native';
import Mybutton from './Components/Mybutton';
import COLORS from './Constants';
import { Ionicons, AntDesign, FontAwesome, } from '@expo/vector-icons';
import Accordian from './Components/Accordian';
// import Footer from './Components/Footer';
import { DatabaseConnection } from '../database-connection'


const db = DatabaseConnection.getConnection();

export default function Mypasswords({ navigation }) {
  const [flatListItems, setFlatListItems] = useState([])

  //fetch data from sqlite database
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

  //display the data fetched from database
  const DisplayData = flatListItems.map((item, index) => {
    console.log(item)
    return (<View
      key={index}
      style={styles.myview} >
      <Accordian
        title={`${item.passwords_id} : ${item.web_nameP}`}
        data={[item.usernameP, item.passwordP]}
      />
    </View>)
  })

  //home button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<TouchableOpacity style={{ marginRight: 20 }}
        onPress={() => navigation.navigate('Home')}>
        <FontAwesome name="home" size={24} color="black" />
      </TouchableOpacity>)
    })
  }, [])

  //clear all
  let clearall = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE passwords_table;', [],
        (tx, results) => {
          if (results && results.rows && results.rows._array) {
            /* do something with the items */
            // results.rows._array holds all the results.
            console.log(JSON.stringify(results.rows._array));
            console.log('table dropped')
           
          } else {
            console.log('no results')
            return navigation.navigate('Home')
          }
        },
        (tx, error) => {
          console.log(error);
        }
      )
    });
  };

  return (<>
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.9 }}>

        <Text style={styles.heading}>My Passwords</Text>

        {DisplayData}
        <Button title="Clear All" onPress={()=>clearall()}/>
      </View>
      <View style={{ flex: 0.1 }}>
        <View style={styles.actions}>
          <Ionicons name="add-circle-outline" size={24} color="black"
            onPress={() => navigation.navigate('add-new-password')}
            style={styles.icons} />

          <AntDesign name="edit" size={24} color="black"
            onPress={() => navigation.navigate('edit-password')}
            style={styles.icons} />

          <AntDesign name="delete" size={24} color="black"
            onPress={() => navigation.navigate('delete-password')}
            style={styles.icons} />

        </View>
      </View>
    </View>
  </>)
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 20,
    color: 'indigo',
    fontWeight: '900',


  },
  myview: {
    padding: 5,
    marginHorizontal: 5,
    marginVertical: 0.1,

  },
  mytext: {
    padding: 5,
    border: "1px solid grey",
    fontWeight: 500,
  },
  title: {
    backgroundColor: 'purple',
    padding: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,

  },
  titletxt: {
    color: 'white',
    fontWeight: 600,
  },
  actions: {
    backgroundColor: 'purple',
    position: 'fixed', left: 0, right: 0, bottom: -10,
    flex: 0.1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

  },
  icons: {
    fontWeight: 600,
    color: 'white',
    fontSize: 20,
    marginBottom: 8,
  }
})