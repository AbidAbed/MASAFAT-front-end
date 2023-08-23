import React from 'react';
import {StyleSheet} from 'react-native';
import Button from './Button';
import {useDispatch} from 'react-redux';
import {changePath, pushHistory} from '../Store/SotreInterface';
import Icon from 'react-native-vector-icons/Entypo';
function Menu({mapStyle}) {
  const dispatch = useDispatch();

  function handleOnClick() {
    dispatch(changePath('/settings'));
    dispatch(pushHistory('/settings'));
  }

  return (
    <Button
      onClick={handleOnClick}
      style={mapStyle ? styles.mapStyle : styles.notMap}
      styleCont={{marginTop: 1}}>
      <Icon name="menu" size={30} color="#ccc" />
    </Button>
  );
}

const styles = StyleSheet.create({
  mapStyle: {
    backgroundColor: '#24507b',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 2,
    marginLeft: 0,
  },
  notMap: {
    width: '12%',
    height: 40,
    position: 'absolute',
    backgroundColor: '#24507b',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2%',
    top: '3%',
    left: '95%',
  },
});

export default Menu;
