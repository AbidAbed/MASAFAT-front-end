import React from 'react';
import { StyleSheet } from 'react-native';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { popHistory } from '../Store/SotreInterface';
import Icon from 'react-native-vector-icons/Ionicons';

function BackButton() {
  const dispatch = useDispatch();

  function handleOnClick() {
    dispatch(popHistory());
  }

  return (
    <Button onClick={handleOnClick} style={styles.button} styleCont={{marginTop:1}}>
      <Icon name="arrow-back" size={24} color="white" />
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '12%',
    height: 40,
    position: 'absolute',
    backgroundColor: '#24507b',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    bottom: '3%',
    right: '95%',
  },
});

export default BackButton;
