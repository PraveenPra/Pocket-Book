import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { Ionicons ,AntDesign ,FontAwesome,  } from '@expo/vector-icons';
import COLORS from '../Constants';

export default function Footer({navigation}) {

    return(
    <View style={{flex: 0.1}}>
    <View style={styles.actions}>
<Ionicons name="add-circle-outline" size={24} color="black" 
onPress={()=>navigation.navigate ('add-new-password')}
style={styles.icons}/>

<AntDesign name="edit" size={24} color="black" 
onPress={()=>navigation.navigate ('edit-password')}
style={styles.icons}/>

<AntDesign name="delete" size={24} color="black" 
onPress={()=>navigation.navigate ('delete-password')}
style={styles.icons}/>

</View>
</View>)
}

const styles = StyleSheet.create({
    actions:{
        backgroundColor:COLORS.default,
        position: 'fixed', left: 0, right: 0, bottom: -10,
        flex:0.1,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        
      },
      icons:{
        fontWeight:600,
        color:'white',
        fontSize:20,
        marginBottom:8,
      }
    })