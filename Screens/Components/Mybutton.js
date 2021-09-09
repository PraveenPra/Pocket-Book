import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../Constants';

const Mybutton = (props) => {
  return (
    <TouchableOpacity
    style={{
        backgroundColor: props.COLOR||COLORS.default,
        alignItems: 'center',
        color: '#ffffff',
        // width:10,
        padding: 10,
        marginTop: 16,
        marginLeft: 45,
        marginRight: 45,
        marginBottom:16,
        borderRadius: 5,
    }}
    //   style={styles.button}
       onPress={props.customClick}>

      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
//   button: {
//     alignItems: 'center',
//     // backgroundColor: props.COLOR,
//     color: '#ffffff',
//     padding: 10,
//     marginTop: 16,
//     marginLeft: 35,
//     marginRight: 35,
//     borderRadius: 5,

//   },
  text: {
    color: '#ffffff',
    fontWeight:600,
    fontSize:20,
  },
});

export default Mybutton;