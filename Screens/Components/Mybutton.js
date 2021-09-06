import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Mybutton = (props) => {
  return (
    <TouchableOpacity
    style={{
        backgroundColor:props.COLOR,
        alignItems: 'center',
        color: '#ffffff',
        padding: 10,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
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