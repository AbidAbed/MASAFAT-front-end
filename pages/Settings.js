import React from 'react';
import {View, StyleSheet} from 'react-native';
import BackButton from '../Components/BackButton';

function Settings() {
  return (
    <View style={styles.container}>
      <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1f2937',
  },
});

export default Settings;
