import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BackButton from '../Components/BackButton';
import Menu from '../Components/Menu';
import {
  addHistory,
  fetchHistory,
  useGetReservationsMutation,
} from '../Store/SotreInterface';
import {useState, useEffect} from 'react';
function History() {
  const history = useSelector(state => state.reservation);
  const user_id = useSelector(state => state.user.id);
  const [page, setPage] = useState(0);
  const [getReservations, getReservationsResponse] =
    useGetReservationsMutation();
  useEffect(() => {
    getReservations({
      user_id,
      size: 10,
      page: 0,
    });
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !getReservationsResponse.isUninitialized &&
      !getReservationsResponse.isLoading
    ) {
      if (getReservationsResponse.isError) {
      } else {
        const historyData = getReservationsResponse.data.map(
          reservationData => {
            return {
              garageName: reservationData.garage.name,
              garageArea: reservationData.garage.area,
              garageId: reservationData.garage.id,
              startTime: reservationData.startTime,
              endTime: reservationData.endTime,
              slotNumber: reservationData.slotNumber,
              fee: reservationData.fee,
            };
          },
        );
        console.log(historyData);
        if (isIntial) dispatch(fetchHistory(historyData));
        else dispatch(addHistory(historyData));
        setIsIntial(false);
      }
    }
  }, [getReservationsResponse]);
  const [isIntial, setIsIntial] = useState(true);
  const renderHistoryItem = ({item}) => (
    <View style={styles.historyItem}>
      <Text style={styles.itemLabel}>Garage name and area :</Text>
      <Text style={styles.itemValue}>
        {item.garageName} , {item.garageArea}
      </Text>

      <Text style={styles.itemLabel}>Garage ID:</Text>
      <Text style={styles.itemValue}>{item.garageId}</Text>

      <Text style={styles.itemLabel}>Start Time:</Text>
      <Text style={styles.itemValue}>{item.startTime}</Text>

      <Text style={styles.itemLabel}>End Time:</Text>
      <Text style={styles.itemValue}>{item.endTime}</Text>

      <Text style={styles.itemLabel}>Slot Number:</Text>
      <Text style={styles.itemValue}>{item.slotNumber}</Text>

      <Text style={styles.itemLabel}>Fee:</Text>
      <Text style={styles.itemValue}>{item.fee}</Text>
    </View>
  );

  function handleOnEndReached() {
    if (!isIntial) {
      getReservations({
        user_id,
        size: 10,
        page: page + 1,
      });
      setPage(page + 1);
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.barView}>
        <BackButton />
        <Text style={styles.text}>History</Text>
        <Menu />
      </View>
      <View>
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContent}
          onEndReached={handleOnEndReached}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 20,
    marginTop: 100,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1f2937',
  },
  text: {
    fontSize: 50,
    textAlign: 'left',
    color: '#24507b',
    position: 'absolute',
    top: '3%',
  },
  barView: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 60,
    paddingHorizontal: '2%',
    marginBottom: 10,
    position: 'absolute',
    top: '3%',
    left: '5%',
    zIndex: 1,
  },
  historyItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemValue: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});

export default History;
