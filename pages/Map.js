import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, TextInput} from 'react-native';
import Input from '../Components/Input';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import {useEffect} from 'react';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {changePath, pushHistory} from '../Store/SotreInterface';
const {width, height} = Dimensions.get('window');

function Map() {
  const [userLongitude, setUserLongitude] = useState(35.94400120899081);
  const [userLatitude, setUserLatitude] = useState(31.99020511580862);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  function onSearchChange(value) {
    setSearch(value);
  }

  function handleSearchSubmit() {
    // Handle the "Enter" click from the keyboard here
    console.log('Search term:', search);
    dispatch(changePath('/search'));
    dispatch(pushHistory('/search'));
  }

  function handleSettingsClick() {
    dispatch(changePath('/settings'));
    dispatch(pushHistory('/settings'));
  }
  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setUserLatitude(latitude);
            setUserLongitude(longitude);
          },
          error => {
            console.log('Error getting location: ', error);
          },
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
          },
        );
      } catch (error) {
        console.log('Error requesting location: ', error);
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={{
            latitude: userLatitude,
            longitude: userLongitude,
            latitudeDelta: 0.00819214595369644,
            longitudeDelta: 0.00586230307817459,
          }}>
          <Marker
            coordinate={{
              latitude: userLatitude,
              longitude: userLongitude,
            }}
          />
        </MapView>
      </View>
      <View style={styles.inputContainer}>
        <Input
          style={styles.searchInput}
          placeholder="Search for a garage"
          onChange={onSearchChange}
          value={search}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#24507b"
          secureTextEntry={false}
          textAlign="center" // Center the cursor when the input is empty
          onSubmitEditing={handleSearchSubmit} // Handle the "Enter" click
        />
        <Button style={styles.button} onClick={handleSettingsClick} styleCont={{marginTop:1}}>
          <Icon name="menu" size={30} color="#ccc" />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    width: width,
    height: height, // Adjust the height of the map container as needed
  },
  map: {
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    top: 20, // Adjust the top value to position the input container as desired
    left: 20,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderColor: '#24507b',
    borderWidth: 3,
    borderRadius: 5,
    color: '#24507b',
    marginRight: 10,
    width: '50%',
    fontFamily: 'italic',
  },
  button: {
    backgroundColor: '#24507b',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 2,
    marginLeft: 0,
  },
});

export default Map;
