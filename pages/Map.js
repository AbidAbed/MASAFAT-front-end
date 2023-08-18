import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import Input from '../Components/Input';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Callout, Marker} from 'react-native-maps';
import {useEffect} from 'react';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeMapGarages,
  changePath,
  changeSearchTerm,
  pushHistory,
  useGetFavoriteGaragesQuery,
  useGetNearbyGaragesMutation,
} from '../Store/SotreInterface';
import useRadiousCalculator from '../Hooks/useRadiousCalculator';
import mapPinImage from '../Assets/mapPin.png';
import {
  changeRenderedGarageId,
  fetchFavoriteGarages,
} from '../Store/SotreInterface';
const {width, height} = Dimensions.get('window');

function Map({selectedGarage}) {
  const {mapGarages} = useSelector(state => state.garages);
  const user_id = useSelector(state => state.user.id);

  const getFavourtiesResponse = useGetFavoriteGaragesQuery({
    user_id,
    size: 10,
    page: 0,
  });

  useEffect(() => {
    console.log(getFavourtiesResponse);
    if (
      !getFavourtiesResponse.isUninitialized &&
      !getFavourtiesResponse.isLoading
    ) {
      if (getFavourtiesResponse.isError) {
      } else {
        dispatch(fetchFavoriteGarages(getFavourtiesResponse.data));
      }
    }
  }, [getFavourtiesResponse]);

  const [userLongitude, setUserLongitude] = useState(35.94400120899081);
  const [userLatitude, setUserLatitude] = useState(31.99020511580862);

  const [baseLongitude, setBaseLongitude] = useState(35.94400120899081);
  const [baseLatitude, setBaseLatitude] = useState(31.99020511580862);

  console.log('user', userLongitude, userLatitude);
  const [errors, setErrors] = useState();

  const [getNearbyGarages, getNearbyGaragesResponse] =
    useGetNearbyGaragesMutation();

  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  function onSearchChange(value) {
    setSearch(value);
  }

  function handleGarageClick(garage_id) {
    console.log(garage_id);
    dispatch(changePath('/garage'));
    dispatch(pushHistory('/garage'));
    dispatch(changeRenderedGarageId(garage_id));
  }
  function handleSearchSubmit() {
    // Handle the "Enter" click from the keyboard here
    console.log('Search term:', search);
    dispatch(changePath('/search'));
    dispatch(pushHistory('/search'));
    dispatch(changeSearchTerm(search));
  }

  function handleSettingsClick() {
    dispatch(changePath('/settings'));
    dispatch(pushHistory('/settings'));
  }

  function onRegionChange(coordinate) {
    const distance = useRadiousCalculator(
      coordinate.longitude,
      coordinate.latitude,
      baseLongitude,
      baseLatitude,
    );
    // console.log('distance', distance, 'coor', coordinate);
    if (distance >= 1000) {
      setBaseLongitude(coordinate.longitude);
      setBaseLatitude(coordinate.latitude);
      getNearbyGarages({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        radius: 1000,
      });
    }
  }
  useEffect(() => {
    if (
      !getNearbyGaragesResponse.isUninitialized &&
      !getNearbyGaragesResponse.isLoading
    ) {
      if (getNearbyGaragesResponse.isError) {
        setErrors("Couldn't load garages");
      } else {
        console.log('nearby garages', getNearbyGaragesResponse.data);
        setErrors();
        dispatch(changeMapGarages(getNearbyGaragesResponse.data));
      }
    }
  }, [getNearbyGaragesResponse]);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const position = await Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setUserLatitude(latitude);
            setUserLongitude(longitude);

            setBaseLongitude(longitude);
            setBaseLatitude(latitude);
            getNearbyGarages({latitude, longitude, radius: 1000});
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
          }}
          onRegionChange={onRegionChange}>
          <Marker
            coordinate={{
              latitude: userLatitude,
              longitude: userLongitude,
            }}
          />
          {mapGarages.map(garage => {
            garageClickCallback = () => {
              handleGarageClick(garage.id);
            };

            return (
              <Marker
                key={garage.id}
                coordinate={{
                  latitude: garage.latitude,
                  longitude: garage.longitude,
                }}
                description={garage.area}
                title={garage.name}
                pinColor="#1f2937"
                image={mapPinImage}>
                <Callout onPress={garageClickCallback}>
                  <View style={styles.markerContainer}>
                    <Text style={styles.markerTitle}>{garage.name}</Text>
                    <Text style={styles.markerDescription}>{garage.area}</Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}
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
        <Button
          style={styles.button}
          onClick={handleSettingsClick}
          styleCont={{marginTop: 1}}>
          <Icon name="menu" size={30} color="#ccc" />
        </Button>
      </View>
      {errors ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errors}</Text>
        </View>
      ) : (
        false
      )}
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  errorContainer: {
    backgroundColor: '#00000000',
    padding: 10,
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 0,
    left: '45%',
    right: 0,
  },
  button: {
    backgroundColor: '#24507b',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginRight: 2,
    marginLeft: 0,
  },
  markerContainer: {
    backgroundColor: '#1f2937',
    borderRadius: 15,
  },
  markerDescription: {
    fontSize: 20,
    color: '#c9d1d9',
    padding: 10,
    fontStyle: 'italic',
  },
  markerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    padding: 10,
    color: '#c9d1d9',
  },
});

export default Map;
