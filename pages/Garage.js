import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import BackButton from '../Components/BackButton';
import {
  useGetGarageByIdQuery,
  useDeleteFavoriteGarageMutation,
  usePostFavoriteGarageMutation,
  addToFavorite,
  deleteFavorite,
  usePostCheckReservationMutation,
  changeAvailableSlots,
  changePath,
  pushHistory,
  changeReservation,
} from '../Store/SotreInterface';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RatingIcon from 'react-native-vector-icons/AntDesign';
import FareIcon from 'react-native-vector-icons/FontAwesome';
import TimeIcon from 'react-native-vector-icons/Ionicons';
import NavigateMapIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Menu from '../Components/Menu';
const {width, height} = Dimensions.get('window');
function Garage() {
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.user.id);
  const garage_id = useSelector(state => state.config.renderedGarageId);
  const [garage, setGarage] = useState();

  const [currentEpoch, setCurrentEpoch] = useState(Date.now() + 30 * 60 * 1000);

  const maxEpochTime = currentEpoch + 7 * 24 * 60 * 60 * 1000;
  const [selectedDate, setSelectedDate] = useState({
    dateString: new Date(currentEpoch).toISOString().split('T')[0],
    timestamp: new Date(currentEpoch).getTime(),
  });
  const [startingTime, setStartingTime] = useState();
  const [endingTime, setEndingTime] = useState();
  const [startingTimeDateObject, setStartingTimeDateObject] = useState(
    new Date(),
  );
  const [endingTimeDateObject, setEndingTimeDateObject] = useState(new Date());
  const [isStartingTimeSelected, setIsStartingTimeSelected] = useState(false);
  const [isEndingTimeSelected, setIsEndingTimeSelected] = useState(false);

  const getGarageResponse = useGetGarageByIdQuery(garage_id);

  const [renderedContent, setRenderedContent] = useState();

  const [errors, setErrors] = useState();

  const [postCheckReservation, postCheckReservationResponse] =
    usePostCheckReservationMutation();

  function handleNavigateToMap() {}

  const [fare, setFare] = useState(0);
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

  function handleDayPress(date) {
    setErrors();
    setSelectedDate(date);
    setCurrentEpoch(Date.now());
    setStartingTime();
    setEndingTime();
  }

  function handleStartingTimeOnChange(event, date) {
    if (event.type === 'set') {
      if (!endingTime || endingTime > event.nativeEvent.timestamp) {
        if (event.nativeEvent.timestamp < Date.now() + 30 * 60 * 1000) {
          setErrors('minimum time allowed is current time + 30 minutes ');
          return;
        } else setErrors();
        setStartingTime(event.nativeEvent.timestamp);
        setStartingTimeDateObject(new Date(event.nativeEvent.timestamp));
        setErrors();
      } else {
        setErrors('Starting time must be smaller than ending time');
      }
    }
    setIsStartingTimeSelected(!isStartingTimeSelected);
  }
  function handleEndtingTimeOnChange(event, date) {
    if (event.type === 'set') {
      if (!startingTime || event.nativeEvent.timestamp > startingTime) {
        if (event.nativeEvent.timestamp < Date.now() + 30 * 60 * 1000) {
          setErrors('minimum time allowed is current time + 30 minutes ');
          return;
        } else setErrors();
        setEndingTime(event.nativeEvent.timestamp);
        setEndingTimeDateObject(new Date(event.nativeEvent.timestamp));
        setErrors();
      } else {
        setErrors('Starting time must be smaller than ending time');
      }
    }
    setIsEndingTimeSelected(!isEndingTimeSelected);
  }

  function handleCheckAvailabilty() {
    console.log(startingTime, endingTime);
    if (startingTime !== undefined && endingTime !== undefined) {
      const start = new Date(startingTime).toISOString().split('.')[0];
      const end = new Date(endingTime).toISOString().split('.')[0];

      const startTime = start.split('T')[1].split(':');
      const endTime = end.split('T')[1].split(':');
      const duration = endTime.map((time, index) => {
        return parseInt(time) - parseInt(startTime[index]);
      });
      const minutesDuration = duration[0] * 60 + duration[1];
      console.log(minutesDuration);
      if (minutesDuration < garage.minimumReservation)
        setErrors(
          `the minimum duration allowed is ${garage.minimumReservation} minutes`,
        );
      else {
        //fare * duration / minimum reservation
        setFare(
          ((garage.fare * minutesDuration) / garage.minimumReservation).toFixed(
            2,
          ),
        );
        postCheckReservation({
          garage: {id: garage_id},
          startTime: start,
          endTime: end,
        });
        setErrors('');
      }
    } else setErrors('select starting and ending time first');
  }

  useEffect(() => {
    console.log(postCheckReservationResponse);
    if (
      !postCheckReservationResponse.isUninitialized &&
      !postCheckReservationResponse.isLoading
    ) {
      if (postCheckReservationResponse.isError) {
        setErrors('No available garage at the choosen garage, time and data');
        dispatch(changePath('/garage/select'));
      } else {
        dispatch(changeAvailableSlots(postCheckReservationResponse.data));
        dispatch(changePath('/garage/select'));
        dispatch(pushHistory('/garage/select'));
        console.log(
          3333333333333,
          new Date(startingTime).toISOString().split('.')[0],
          new Date(endingTime).toISOString().split('.')[0],
        );
        dispatch(
          changeReservation({
            startTime: new Date(startingTime).toISOString().split('.')[0],
            endTime: new Date(endingTime).toISOString().split('.')[0],
            cost: fare,
          }),
        );
      }
    }
  }, [postCheckReservationResponse]);

  useEffect(() => {
    if (startingTime !== undefined && endingTime !== undefined) {
      if (
        startingTime < Date.now() + 30 * 60 * 1000 ||
        endingTime < Date.now() + 30 * 60 * 1000
      ) {
        setErrors('minimum time allowed is current time + 30 minutes ');
        return;
      } else setErrors();
      const start = new Date(startingTime).toISOString().split('.')[0];
      const end = new Date(endingTime).toISOString().split('.')[0];

      const startTime = start.split('T')[1].split(':');
      const endTime = end.split('T')[1].split(':');
      const duration = endTime.map((time, index) => {
        return parseInt(time) - parseInt(startTime[index]);
      });
      const minutesDuration = duration[0] * 60 + duration[1];
      setFare(
        ((garage.fare * minutesDuration) / garage.minimumReservation).toFixed(
          2,
        ),
      );
    } else {
      setFare(0);
    }
  }, [startingTime, endingTime]);

  useEffect(() => {
    // console.log(getGarageResponse);
    if (!getGarageResponse.isUninitialized && !getGarageResponse.isLoading) {
      if (getGarageResponse.isError) {
        setRenderedContent(
          <View style={styles.container}>
            <Menu />
            <Text style={styles.errorText}>
              Error while conecting to server
            </Text>
            <BackButton />
          </View>,
        );
      } else {
        setGarage(getGarageResponse.data);
      }
    }
  }, [getGarageResponse]);

  useEffect(() => {
    if (garage !== undefined) {
      setRenderedContent(
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.barView}>
              <BackButton />
              <Menu />
              <Button
                buttonText="Check availability"
                onClick={handleCheckAvailabilty}
                style={styles.button}></Button>
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
            <View style={styles.calendarContainer}>
              <Calendar
                style={styles.calendar}
                theme={styles.calenderTheme}
                current={selectedDate.dateString}
                minDate={new Date(currentEpoch).toISOString().split('T')[0]}
                maxDate={new Date(maxEpochTime).toISOString().split('T')[0]}
                markedDates={{
                  [selectedDate.dateString]: {
                    selected: true,
                    marked: true,
                  },
                }}
                onDayPress={handleDayPress}
              />
            </View>
            <View style={styles.timeContainer}>
              <Button
                style={styles.button}
                buttonText="Pick starting time"
                onClick={() =>
                  setIsStartingTimeSelected(!isStartingTimeSelected)
                }></Button>
              <Text style={styles.itemTitle}>
                Starting time{' '}
                {startingTime
                  ? startingTimeDateObject
                      .toISOString()
                      .split('T')[1]
                      .split('.')[0]
                  : '--:--'}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <Button
                style={styles.button}
                buttonText="Pick ending time"
                onClick={() =>
                  setIsEndingTimeSelected(!isEndingTimeSelected)
                }></Button>
              <Text style={styles.itemTitle}>
                Ending time{'   '}
                {endingTime
                  ? endingTimeDateObject
                      .toISOString()
                      .split('T')[1]
                      .split('.')[0]
                  : '--:--'}
              </Text>
            </View>
            {isStartingTimeSelected ? (
              <View style={styles.timePickerContainer}>
                <RNDateTimePicker
                  is24Hour={true}
                  minimumDate={Date.now() + 30 * 60 * 1000}
                  mode="time"
                  value={new Date(selectedDate.timestamp)}
                  onChange={handleStartingTimeOnChange}
                />
              </View>
            ) : (
              false
            )}
            {isEndingTimeSelected ? (
              <View style={styles.timePickerContainer}>
                <RNDateTimePicker
                  minimumDate={Date.now() + 30 * 60 * 1000}
                  is24Hour={true}
                  mode="time"
                  value={new Date(selectedDate.timestamp)}
                  onChange={handleEndtingTimeOnChange}
                />
              </View>
            ) : (
              false
            )}
            <View style={styles.errorTextContainer}>
              <Text style={styles.errorText}>{errors}</Text>
            </View>

            <View style={styles.costView}>
              <Text style={styles.itemTitle}>Cost {fare} JD</Text>
              {startingTime !== undefined && endingTime !== undefined ? (
                <Text style={styles.reservationDetails}>
                  your Reservation starts on{' '}
                  {
                    new Date(startingTime)
                      .toISOString()
                      .split('T')[1]
                      .split('.')[0]
                  }{' '}
                  in {new Date(startingTime).toISOString().split('T')[0]} and
                  ends on{' '}
                  {
                    new Date(endingTime)
                      .toISOString()
                      .split('T')[1]
                      .split('.')[0]
                  }{' '}
                  in {new Date(startingTime).toISOString().split('T')[0]}
                </Text>
              ) : (
                false
              )}
            </View>
          </View>
        </ScrollView>,
      );
    }
  }, [
    garage,
    selectedDate,
    isEndingTimeSelected,
    isStartingTimeSelected,
    isFavorite,
    errors,
    fare,
  ]);
  return <>{renderedContent}</>;
}

const styles = StyleSheet.create({
  reservationDetails: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#c9d1d9',
    flexWrap: 'wrap',
    width: '60%',
    right: '70%',
  },
  costView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  errorTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    left: '5%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    backgroundColor: '#1f2937',
    width: width,
    height: height,
  },
  barView: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 60,
    paddingHorizontal: '4%',
    marginBottom: 5,
  },
  calendarContainer: {
    width: '100%',
    marginBottom: 20,
  },
  calendar: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#75ace1',
    height: 350,
  },
  calenderTheme: {
    backgroundColor: '#ffffff',
    calendarBackground: '#1f2937',
    textSectionTitleColor: '#75ace1',
    selectedDayBackgroundColor: '#d9e',
    selectedDayTextColor: '#1e4467',
    todayTextColor: '#a290d2',
    dayTextColor: '#d9e',
    textDisabledColor: '#75ace1',
  },
  timePickerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  mapButton: {
    backgroundColor: 'transparent',
    left: '85%',
    width: '14%',
    top: '20%',
  },
  errorText: {
    fontSize: 14,
    color: '#D25157',
    marginTop: 1,
  },
  button: {
    backgroundColor: '#24507b',
    padding: 6,
    borderRadius: 5,
    marginRight: 15,
    marginLeft: 4,
    marginVertical: 4,
    width: '40%',
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
  },
});

export default Garage;
