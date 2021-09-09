import { TouchableOpacity } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, Button, Alert, AppRegistry } from 'react-native';
import Mybutton from './Components/Mybutton';
import COLORS from './Constants';
import { Ionicons, AntDesign, FontAwesome, } from '@expo/vector-icons';
import Accordian from './Components/Accordian';
import { DatabaseConnection } from '../database-connection'


const db = DatabaseConnection.getConnection();

export default function Mypasswords({ navigation }) {

  const [flatListItems, setFlatListItems] = useState([])



  //home button
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<TouchableOpacity style={{ marginRight: 20 }}
        onPress={() => navigation.navigate('Home')}>
        <FontAwesome name="home" size={24} color="black" />
      </TouchableOpacity>)
    })
  }, [])

  //fetch data from sqlite database
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

  function clickEdit(selectedID) {
    navigation.navigate('edit-password', { id: selectedID })
  }
  function clickDelete(selectedID) {
    console.log(selectedID)
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  passwords_table where passwords_id=?',
        [selectedID],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Deleted Sucessfully',
            );
            return navigation.replace('my-passwords')
          } else {
            alert('Failed to Delete !!!');
          }
        }
      );
    });
  }

  //display the data fetched from database
  const DisplayData = flatListItems.map((item, index) => {
    console.log(item)
    return (<View
      key={index}
      style={styles.myview} >

      <Accordian
        itemid={item.passwords_id}
        title={`${item.web_nameP}`}
        listdata={[item.usernameP, item.passwordP]}
        onChildEditClick={clickEdit}
        onChildDeleteClick={clickDelete}
      />

    </View>)
  })



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
            // console.log('no results')
            console.log('Cleared All')
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

      </View>
      <View style={{ flex: 0.1 }}>
        <View style={styles.actions}>
          <Ionicons name="add-circle-outline" size={24} color="black"
            onPress={() => navigation.navigate('add-new-password')}
            style={styles.icons} />


          <AntDesign name="delete" size={24} color="black"
            onPress={() => clearall()}
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