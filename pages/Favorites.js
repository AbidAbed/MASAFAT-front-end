import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BackButton from '../Components/BackButton';
import {
  changeRenderedGarageId,
  changePath,
  pushHistory,
  useGetFavoriteGaragesMutation,
  useDeleteFavoriteGarageMutation,
} from '../Store/SotreInterface';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  addBulkFavoriteGarages,
  deleteFavorite,
  fetchFavoriteGarages,
} from '../Store/SotreInterface';
import Menu from '../Components/Menu';

function Favorites() {
  const favoriteGarages = useSelector(state => {
    console.log(555555555555, state.garages.favoriteGarages.length);
    return state.garages.favoriteGarages;
  });
  const user_id = useSelector(state => state.user.id);
  const [page, setPage] = useState(0);

  const [initialFetchComplete, setInitialFetchComplete] = useState(false);

  const [renderedContent, setRenderedContent] = useState(
    <View style={styles.container}>
      <View style={styles.barView}>
        <BackButton />
        <Text style={styles.text}>Favorites</Text>
        <Menu />
      </View>
      <View style={styles.emptyView}>
        <Text style={styles.itemTitle}>You don't have any favorites</Text>
      </View>
    </View>,
  );

  const [getFavoriteGarages, getFavourtiesResponse] =
    useGetFavoriteGaragesMutation();

  useEffect(() => {
    getFavoriteGarages({user_id, page: 0, size: 10});
  }, []);

  useEffect(() => {
    console.log(getFavourtiesResponse);
    if (
      !getFavourtiesResponse.isUninitialized &&
      !getFavourtiesResponse.isLoading
    ) {
      if (getFavourtiesResponse.isError) {
      } else {
        const fGarages = getFavourtiesResponse.data.map(
          favorite => favorite.garage,
        );
        if (page === 0 && !initialFetchComplete) {
          dispatch(fetchFavoriteGarages(fGarages));
          getFavoriteGarages({user_id, page: 0, size: 10});
        } else dispatch(addBulkFavoriteGarages(fGarages));
      }
      setInitialFetchComplete(true);
    }
  }, [getFavourtiesResponse]);

  const dispatch = useDispatch();
  const [deleteFavourtieGarages, deleteFavourtieGaragesResponse] =
    useDeleteFavoriteGarageMutation();

  function handleDeleteFavourites(item) {
    deleteFavourtieGarages({garage_id: item.id, user_id});
    setInitialFetchComplete(false);
  }

  function handleNextPage() {
    getFavoriteGarages({user_id, page: page + 1, size: 10});
    setPage(page + 1);
  }

  console.log(favoriteGarages);
  useEffect(() => {
    console.log(deleteFavourtieGaragesResponse);
    if (
      !deleteFavourtieGaragesResponse.isUninitialized &&
      !deleteFavourtieGaragesResponse.isLoading
    ) {
      if (deleteFavourtieGaragesResponse.isError) {
        // console.log(deleteFavourtieGaragesResponse);
      } else {
        dispatch(
          deleteFavorite(deleteFavourtieGaragesResponse.originalArgs.garage_id),
        );
        // getFavourtiesResponse.refetch();
      }
    }
  }, [deleteFavourtieGaragesResponse]);

  function handleGarageClick(garage_id) {
    dispatch(changeRenderedGarageId(garage_id));
    dispatch(changePath('/garage'));
    dispatch(pushHistory('/garage'));
  }
  const renderItem = ({item}) => {
    const garageClickCallback = () => handleGarageClick(item.id);
    return (
      <TouchableOpacity onPress={garageClickCallback}>
        <View style={styles.itemContainer}>
          <View style={styles.itemBackgroundContainer}>
            <ImageBackground
              source={{
                uri: item.imageURL,
              }} // Replace with your Google Drive image link
              style={styles.itemBackground}>
              <Button
                buttonText=""
                onClick={() => handleDeleteFavourites(item)}
                style={styles.favButton}
                styleCont={{marginTop: 1}}>
                <Icon name="favorite" size={30} color="#ccc" />
              </Button>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.area}</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    console.log(500, favoriteGarages.length);
    setRenderedContent(
      <View style={styles.container}>
        <View style={styles.barView}>
          <BackButton />
          <Text style={styles.text}>Favorites</Text>
          <Menu />
        </View>
        {favoriteGarages !== null && favoriteGarages.length !== 0 ? (
          <FlatList
            data={favoriteGarages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.flatListContent}
            onEndReached={handleNextPage}
          />
        ) : (
          <View style={styles.emptyView}>
            <Text style={styles.itemTitle}>You don't have any favorites</Text>
          </View>
        )}
      </View>,
    );
  }, [favoriteGarages, dispatch]);
  console.log(favoriteGarages.length);
  return <>{renderedContent}</>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1f2937',
    width: '100%',
    height: '100%',
  },
  emptyView: {
    justifyContent: 'center',
    padding: '18%',
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
  itemBackgroundContainer: {
    borderBottomLeftRadius: 15, // Apply border radius to create rounded bottom corners
    borderBottomRightRadius: 15,
    overflow: 'hidden', // Clip content to the rounded corners
  },
  favButton: {
    position: 'absolute', // Position the button absolutely within the container
    top: 10, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
    backgroundColor: '#24507b',
    padding: 4, // Adjust padding as needed to make the button smaller
    borderRadius: 5,
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
  flatListContent: {
    paddingBottom: 20,
    marginTop: 60,
  },
  itemContainer: {
    padding: 5,
    marginVertical: 2,
  },
  itemBackground: {
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    height: 200,
    position: 'relative',
  },
  itemContent: {
    backgroundColor: '#1e4467',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  text: {
    fontSize: 50,
    textAlign: 'left',
    color: '#ccc',
    position: 'absolute',
    top: '3%',
  },
});

export default Favorites;
