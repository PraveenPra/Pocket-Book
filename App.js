import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Homescreen from './Screens/Homescreen'
import AddNewPassword from './Screens/AddNewPassword'
import Mypasswords from './Screens/Mypasswords'
import Mynotes from './Screens/Mynotes';
import Mydates from './Screens/Mydates';
import EditPassword from './Screens/EditPassword';
import DeletePassword from './Screens/DeletePassword';

const Stack=createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
  <Stack.Navigator >
  {/* //screenOptions={{headerShown: false}}
  //make true if u want to see headers */}
  
  
  <Stack.Screen name='Home' component={Homescreen}/>
  
  <Stack.Screen name='add-new-password' component={AddNewPassword}  />
  <Stack.Screen name='edit-password' component={EditPassword}/>
  <Stack.Screen name='delete-password' component={DeletePassword}/>
   
  <Stack.Screen name='my-passwords' component={Mypasswords}/>
  <Stack.Screen name='my-notes' component={Mynotes}/>
  <Stack.Screen name='my-dates' component={Mydates}/>
  
  </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
