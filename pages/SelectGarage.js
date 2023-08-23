import {useDispatch, useSelector} from 'react-redux';
import Button from '../Components/Button';
import CarIcon from 'react-native-vector-icons/FontAwesome5';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {
  changePath,
  pushHistory,
  useDeleteFavoriteGarageMutation,
  useGetGarageByIdQuery,
  usePostFavoriteGarageMutation,
  usePostReserveGarageMutation,
} from '../Store/SotreInterface';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigateMapIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RatingIcon from 'react-native-vector-icons/AntDesign';
import FareIcon from 'react-native-vector-icons/FontAwesome';
import TimeIcon from 'react-native-vector-icons/Ionicons';
import React, {useState, useEffect} from 'react';
const {width, height} = Dimensions.get('window');
import BackButton from '../Components/BackButton';
import Menu from '../Components/Menu';
function SelectGarage() {
  const [availableSlots, garage_id] = useSelector(state => [
    state.config.availableSlots,
    state.config.renderedGarageId,
  ]);
  const dispatch = useDispatch();
  const reservationDetails = useSelector(state => state.config.reservation);
  const [garage, setGarage] = useState({});
  const [errors, setErrors] = useState();
  const getGarageResponse = useGetGarageByIdQuery(garage_id);

  const user_id = useSelector(state => state.user.id);
  const [reserveGarage, reservGarageResponse] = usePostReserveGarageMutation();

  useEffect(() => {
    console.log(reservGarageResponse);
    if (
      !reservGarageResponse.isUninitialized &&
      !reservGarageResponse.isLoading
    ) {
      if (reservGarageResponse.isError) {
      } else {
        dispatch(changePath('/payment'));
        dispatch(pushHistory('/payment'));
      }
    }
  }, [reservGarageResponse]);

  useEffect(() => {
    if (!getGarageResponse.isUninitialized && !getGarageResponse.isLoading) {
      if (getGarageResponse.isError) {
        setErrors('No available garage to park at the chosen time and date');
      } else {
        setGarage(getGarageResponse.data);
      }
    }
  }, [getGarageResponse]);

  function handleNavigateToMap() {}
  const favoriteGarages = useSelector(state => state.garages.favoriteGarages);
  const favoriteGarage = favoriteGarages.filter(
    fGarage => fGarage.id === garage_id,
  );
  console.log(favoriteGarage);
  const [isFavorite, setisFavorite] = useState(favoriteGarage.length === 1);

  const [deleteFavoriteGarage, deleteFavoriteGarageResponse] =
    useDeleteFavoriteGarageMutation();
  const [postFavoriteGarage, postFavoriteGarageResponse] =
    usePostFavoriteGarageMutation();

  function handleFavourites() {
    if (isFavorite) {
      deleteFavoriteGarage({user_id, garage_id: garage_id});
      setisFavorite(false);
    } else {
      postFavoriteGarage({user_id, garage_id});
      setisFavorite(true);
    }
  }

  useEffect(() => {
    console.log(postFavoriteGarageResponse);
    if (
      !postFavoriteGarageResponse.isUninitialized &&
      !postFavoriteGarageResponse.isLoading
    ) {
      if (postFavoriteGarageResponse.isError) {
      } else {
        dispatch(addToFavorite(postFavoriteGarageResponse.data.garage));
      }
    }
  }, [postFavoriteGarageResponse]);

  useEffect(() => {
    console.log(deleteFavoriteGarageResponse);
    if (
      !deleteFavoriteGarageResponse.isUninitialized &&
      !deleteFavoriteGarageResponse.isLoading
    ) {
      if (deleteFavoriteGarageResponse.isError) {
      } else {
        dispatch(deleteFavorite(garage_id));
      }
    }
  }, [deleteFavoriteGarageResponse]);

  function handleSlotClicked(slot) {
    reserveGarage({
      user: {id: user_id},
      garage: {id: garage_id},
      startTime: reservationDetails.startTime,
      endTime: reservationDetails.endTime,
      fee: reservationDetails.cost,
      slotNumber: slot,
    });
  }
  const renderItem = ({item}) => {
    if (availableSlots.find(element => element === item)) {
      return (
        <View style={styles.rowItem}>
          <Button
            buttonText={`available ${item}`}
            onClick={() => handleSlotClicked(item)}
            style={styles.smallButton} // Apply smaller button style
          />
        </View>
      );
    } else {
      return (
        <View style={styles.rowItem}>
          <Button
            buttonText={`${item} is Reserved`}
            style={styles.smallButton} // Apply smaller button style
          >
            <CarIcon name="car-side" size={40} color="#ccc" />
          </Button>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.barView}>
        <BackButton />
        <Text style={styles.text}>Available slots</Text>
        <Menu />
      </View>
      <ImageBackground
        source={{
          uri: garage.imageURL,
        }}
        style={styles.itemBackground}>
        <Button
          onClick={handleFavourites}
          style={styles.favButton}
          styleCont={{marginTop: 1}}>
          {isFavorite ? (
            <Icon name="favorite" size={30} color="#ccc" />
          ) : (
            <Icon name="favorite-border" size={30} color="#ccc" />
          )}
        </Button>
        <View style={styles.itemContent}>
          <Button onClick={handleNavigateToMap} style={styles.mapButton}>
            <NavigateMapIcon name="map-marker" size={30} color="#ccc" />
          </Button>
          <View style={styles.nameAndArea}>
            <Text style={styles.itemTitle}>
              {garage.name}
              {'  , '}
              {garage.area}
            </Text>
          </View>
          <View style={styles.bottomRow}>
            <View style={styles.rowItem}>
              <Text style={styles.itemDescription}>
                <RatingIcon name="star" size={30} color="#ccc" />
                {garage.rating}
              </Text>
            </View>
            <View style={styles.rowItem}>
              <Text style={styles.itemDescription}>
                <FareIcon name="dollar" size={30} color="#ccc" />
                {garage.fare} JD
              </Text>
            </View>

            <View style={styles.rowItem}>
              <Text style={styles.itemDescription}>
                <TimeIcon name="time" size={30} color="#ccc" />
                min. duration {garage.minimumReservation} minutes
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <FlatList
        key={garage_id}
        data={Array.from({length: garage.slots}, (_, index) => index + 1)}
        renderItem={renderItem}
        keyExtractor={item => item.toString()}
        contentContainerStyle={styles.rowContainer}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f2937',
    width: width,
    height: height,
  },
  rowContainer: {
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  rowItem: {
    width: '30%', // Adjust the width as needed for three columns
    marginBottom: 20,
  },
  flatList: {},
  smallButton: {
    backgroundColor: '#24507b',
    borderRadius: 5,
    margin: 2,
    padding: 2,
    width: 100,
    height: 80,
    right: '30%',
    alignContent: 'center',
  },
  barView: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '90%',
    height: 60,
    paddingHorizontal: '2%',
    marginBottom: 10,
    position: 'absolute',
    top: '3%',
    left: '5%',
    zIndex: 1,
  },
  favButton: {
    position: 'absolute', // Position the button absolutely within the container
    top: 10, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
    backgroundColor: '#24507b',
    padding: 4, // Adjust padding as needed to make the button smaller
    borderRadius: 5,
    zIndex: 1,
  },
  itemContent: {
    backgroundColor: '#1e4467',
    padding: 5,
    width: '100%',
    marginTop: '5%',
  },
  nameAndArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: '3%',
  },
  rowItem: {
    marginRight: '14%',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c9d1d9',
    flexWrap: 'wrap',
    width: '50%',
  },
  itemDescription: {
    fontSize: 17,
    color: '#d7e6f4',
    flexWrap: 'wrap',
    width: '80%',
    textAlign: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemBackground: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 200,
    marginBottom: 5,
    marginTop: '30%',
  },
  mapButton: {
    backgroundColor: 'transparent',
    left: '85%',
    width: '14%',
    top: '20%',
  },
  text: {
    fontSize: 30,
    textAlign: 'left',
    color: '#ccc',
    position: 'absolute',
    top: '3%',
  },
});

export default SelectGarage;
