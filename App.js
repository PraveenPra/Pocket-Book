import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Homescreen from './Screens/Homescreen'
import AddNewPassword from './Screens/AddNewPassword'
import Mypasswords from './Screens/Mypasswords'
import EditPassword from './Screens/EditPassword';


const Stack=createStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
  <Stack.Navigator >
  {/* //screenOptions={{headerShown: false}}
  //make true if u want to see headers */}
  
  
  <Stack.Screen name='Home' component={Homescreen}/>
  <Stack.Screen name='my-passwords' component={Mypasswords}/>
  <Stack.Screen name='add-new-password' component={AddNewPassword}  />
  <Stack.Screen name='edit-password' component={EditPassword}/>
  
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
