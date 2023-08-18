import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
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
} from '../Store/SotreInterface';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
function Garage() {
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.user.id);
  const garage_id = useSelector(state => state.config.renderedGarageId);
  const [garage, setGarage] = useState();

  const [currentEpoch, setCurrentEpoch] = useState(Date.now());

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

  const [duration, setDuraion] = useState('');
  const [errors, setErrors] = useState();

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

  function handleDayPress(date) {
    setErrors();
    setSelectedDate(date);
    setCurrentEpoch(Date.now());
    setStartingTime();
    setEndingTime();
  }

  function handleStartingTimeOnChange(event, date) {
    if (event.type === 'set') {
      if (
        !endingTime ||
        endingTime + date.getTimezoneOffset() * 60 * 1000 >
          event.nativeEvent.timestamp
      ) {
        setStartingTime(
          event.nativeEvent.timestamp - date.getTimezoneOffset() * 60 * 1000,
        );
        setStartingTimeDateObject(
          new Date(
            event.nativeEvent.timestamp - date.getTimezoneOffset() * 60 * 1000,
          ),
        );
        setErrors();
      } else {
        setErrors('Starting time must be smaller than ending time');
      }
    }
    setIsStartingTimeSelected(false);
  }
  function handleEndtingTimeOnChange(event, date) {
    if (event.type === 'set') {
      if (
        !startingTime ||
        event.nativeEvent.timestamp >
          startingTime + date.getTimezoneOffset() * 60 * 1000
      ) {
        setEndingTime(
          event.nativeEvent.timestamp - date.getTimezoneOffset() * 60 * 1000,
        );
        setEndingTimeDateObject(
          new Date(
            event.nativeEvent.timestamp - date.getTimezoneOffset() * 60 * 1000,
          ),
        );
        setErrors();
      } else {
        setErrors('Starting time must be smaller than ending time');
      }
    }
    setIsEndingTimeSelected(false);
  }

  // console.log(new Date(startingTime), new Date(endingTime));
  // const starting = new Date(startingTime);
  // const ending = new Date(endingTime);
  // const [hh_s, mm_s, ss_s] = starting.toTimeString().split(' ')[0].split(':');
  // const [hh_e, mm_e, ss_e] = ending.toTimeString().split(' ')[0].split(':');
  // if (endingTime > startingTime) {
  //   console.log(
  //     'duration : ',
  //     parseInt(hh_e) - parseInt(hh_s),
  //     ':',
  //     parseInt(mm_e) - parseInt(mm_s),
  //     ':',
  //     parseInt(ss_e) - parseInt(ss_s),
  //   );
  // } else {
  //   console.log(
  //     'duration : ',
  //     parseInt(hh_e) - parseInt(hh_s) * -1,
  //     ':',
  //     parseInt(mm_e) - parseInt(mm_s) * -1,
  //     ':',
  //     parseInt(ss_e) - parseInt(ss_s) * -1,
  //   );
  // }

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
        dispatch(addToFavorite(garage));
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

  useEffect(() => {
    // console.log(getGarageResponse);
    if (!getGarageResponse.isUninitialized && !getGarageResponse.isLoading) {
      if (getGarageResponse.isError) {
        setRenderedContent(
          <View style={styles.container}>
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
        <View style={styles.container}>
          <ImageBackground
            source={{
              uri: 'https://drive.google.com/uc?id=1K46lRlholisxFEbShb1nR9YWHKTnApb6',
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
              <Text style={styles.itemTitle}>{garage.name}</Text>
              <Text style={styles.itemDescription}>{garage.area}</Text>
            </View>
          </ImageBackground>
          <View style={styles.calendarContainer}>
            <Calendar
              style={styles.calendar}
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
              onClick={() => setIsStartingTimeSelected(true)}></Button>
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
              onClick={() => setIsEndingTimeSelected(true)}></Button>
            <Text style={styles.itemTitle}>
              Ending time{'   '}
              {endingTime
                ? endingTimeDateObject.toISOString().split('T')[1].split('.')[0]
                : '--:--'}
            </Text>
          </View>
          {isStartingTimeSelected ? (
            <View style={styles.timePickerContainer}>
              <RNDateTimePicker
                is24Hour={true}
                mode="time"
                value={
                  new Date(
                    selectedDate.timestamp +
                      startingTimeDateObject.getTimezoneOffset() * 60 * 1000,
                  )
                }
                onChange={handleStartingTimeOnChange}
              />
            </View>
          ) : (
            false
          )}
          {isEndingTimeSelected ? (
            <View style={styles.timePickerContainer}>
              <RNDateTimePicker
                is24Hour={true}
                mode="time"
                value={
                  new Date(
                    selectedDate.timestamp +
                      endingTimeDateObject.getTimezoneOffset() * 60 * 1000,
                  )
                }
                onChange={handleEndtingTimeOnChange}
              />
            </View>
          ) : (
            false
          )}
          <View>
            <Text style={styles.errorText}>{errors}</Text>
          </View>
          <BackButton />
        </View>,
      );
    }
  }, [
    garage,
    selectedDate,
    isEndingTimeSelected,
    isStartingTimeSelected,
    isFavorite,
  ]);
  return <>{renderedContent}</>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    padding: 18,
    backgroundColor: '#1f2937',
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
    marginBottom: 10,
  },
  itemContent: {
    backgroundColor: '#1e4467',
    padding: 15,
    borderRadius: 8,
    width: '100%',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#c9d1d9',
  },
  itemDescription: {
    fontSize: 16,
    color: '#d7e6f4',
  },
  calendarContainer: {
    width: '100%',
    marginBottom: 20,
  },
  calendar: {
    width: '100%',
  },
  timePickerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#24507b',
    padding: 6,
    borderRadius: 5,
    marginRight: 15,
    marginLeft: 4,
    marginVertical: 8,
    width: '40%',
  },
  favButton: {
    position: 'absolute', // Position the button absolutely within the container
    top: 10, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
    backgroundColor: '#24507b',
    padding: 4, // Adjust padding as needed to make the button smaller
    borderRadius: 5,
  },
});

export default Garage;
