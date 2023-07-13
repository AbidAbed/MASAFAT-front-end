import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

function Button({ onClick, buttonText, style, children }) {
  return (
    <TouchableOpacity style={style || styles.button} onPress={onClick}>
      {buttonText && <Text style={styles.buttonText}>{buttonText}</Text>}
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#24507b',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
