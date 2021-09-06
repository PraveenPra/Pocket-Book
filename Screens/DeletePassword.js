import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import { StyleSheet,Alert,TextInput,Text, View, Button,SafeAreaView } from 'react-native';
import {DatabaseConnection} from '../database-connection'

const db=DatabaseConnection.getConnection();

export default function DeletePassword({ navigation }) {
    let [inputUserId, setInputUserId] = useState('');

    let deletepassword = () => {
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM  passwords_table where passwords_id=?',
            [inputUserId],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Deleted Sucessfully',                 
                //   [
                //     {
                //       text: 'Ok',
                //       onPress: () => navigation.navigate('HomeScreen'),
                //     },
                //   ],
                //   { cancelable: false }
                );
                return  navigation.replace('my-passwords')
            } else {
            alert('Failed to Delete !!!');
              }
            }
          );
        });
      };

      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
              <TextInput
                placeholder="password ID to delete..."
                onChangeText={
                  (inputUserId) => setInputUserId(inputUserId)
                }
                style={{ padding: 10 }}
              />
              <Button title="Delete" onPress={deletepassword} />
            </View>
          </View>
        </SafeAreaView>
      );
    };
    