import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';

function Button({onClick, buttonText, style, children,styleCont}) {
  return (
    <TouchableOpacity style={style || styles.button} onPress={onClick}>
      <View style={styleCont || styles.contentContainer}>
        {children}
        {buttonText && <Text style={styles.buttonText}>{buttonText}</Text>}
      </View>
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
  contentContainer: {
    flexDirection: 'row', // Set 'row' to arrange children and text in a row
    alignItems: 'center', // Align children and text vertically in the center
    paddingLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
    flex: 1, // Take up remaining space in the row
  },
});

export default Button;
