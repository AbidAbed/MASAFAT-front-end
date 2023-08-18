import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BackButton from '../Components/BackButton';
import {
  fetchSearchGarages,
  useGetSearchGaragesQuery,
  changeSearchTerm,
  changeRenderedGarageId,
  changePath,
  pushHistory,
  useGetFavoriteGaragesQuery,
  usePostFavoriteGarageMutation,
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
import Input from '../Components/Input';
import Button from '../Components/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  addBulkFavoriteGarages,
  addBulkSearchGarages,
  deleteFavorite,
  fetchFavoriteGarages,
} from '../Store/SotreInterface';
function Search() {
  const searchTerm = useSelector(state => state.config.searchTerm);
  let searchedGarages = useSelector(state => state.garages.searchGarages);
  const [errors, setErrors] = useState();
  const [page, setPage] = useState(0);
  const searchResponse = useGetSearchGaragesQuery({
    query: searchTerm,
    page: page,
    size: 10,
  });
  const [initialFetchComplete, setInitialFetchComplete] = useState(false);

  const [isFavoriteObj, setIsFavoriteObj] = useState({});
  const favoriteGarages = useSelector(state => state.garages.favoriteGarages);

  const user_id = useSelector(state => state.user.id);

  const getFavourtiesResponse = useGetFavoriteGaragesQuery({
    user_id,
    page: page,
    size: 10,
  });
  useEffect(() => {
    if (
      !getFavourtiesResponse.isUninitialized &&
      !getFavourtiesResponse.isLoading
    ) {
      if (getFavourtiesResponse.isError) {
      } else {
        if (page === 0 || !initialFetchComplete)
          dispatch(fetchFavoriteGarages(getFavourtiesResponse.data));
        else dispatch(addBulkFavoriteGarages(getFavourtiesResponse.data));
      }
    }
  }, [getFavourtiesResponse]);
  const dispatch = useDispatch();

  useEffect(() => {
    let dataForIsFavorite = {};
    searchedGarages = searchedGarages.map(searchGarage => {
      const isSearchGarageAFavorite = favoriteGarages.filter(fGarage => {
        // console.log(searchGarage.id, fGarage.garage_id);
        return fGarage.id === searchGarage.id;
      });

      if (isSearchGarageAFavorite.length === 1) {
        dataForIsFavorite[searchGarage.id] = true;
      } else {
        dataForIsFavorite[searchGarage.id] = false;
      }
      return searchGarage;
    });
    // console.log(dataForIsFavorite);
    setIsFavoriteObj({...dataForIsFavorite});
  }, [searchedGarages]);
  // console.log(isFavoriteObj);
  const [postFavoriteGarages, postFavoriteGaragesResponse] =
    usePostFavoriteGarageMutation();
  const [deleteFavourtieGarages, deleteFavourtieGaragesResponse] =
    useDeleteFavoriteGarageMutation();

  function handleDeleteFavourites(item) {
    deleteFavourtieGarages({garage_id: item.id, user_id});
    // console.log('Removed from favorites');
    item.isFavorite = false;
    const newIsFavoriteObj = {};
    newIsFavoriteObj[item.id] = false;
    setIsFavoriteObj({...isFavoriteObj, ...newIsFavoriteObj});
  }
  function handleAddFavourites(item) {
    postFavoriteGarages({user_id, garage_id: item.id});
    // console.log('Added to favorites');
    const newIsFavoriteObj = {};
    newIsFavoriteObj[item.id] = true;
    setIsFavoriteObj({...isFavoriteObj, ...newIsFavoriteObj});
  }

  function handleNextPage() {
    searchResponse.refetch({search, page: page + 1, size: 10});
    getFavourtiesResponse.refetch({user_id, page: page + 1, size: 10});
    setPage(page + 1);
  }
  useEffect(() => {
    if (
      !postFavoriteGaragesResponse.isUninitialized &&
      !postFavoriteGaragesResponse.isLoading
    ) {
      if (postFavoriteGaragesResponse.isError) {
        // console.log(addFavoriteGarage());
      } else {
        getFavourtiesResponse.refetch();
      }
    }
  }, [postFavoriteGaragesResponse]);

  useEffect(() => {
    if (
      !deleteFavourtieGaragesResponse.isUninitialized &&
      !deleteFavourtieGaragesResponse.isLoading
    ) {
      if (deleteFavourtieGaragesResponse.isError) {
        // console.log(deleteFavourtieGaragesResponse);
      } else {
        dispatch(
          deleteFavorite(deleteFavourtieGaragesResponse.originalArgs.garageID),
        );
      }
    }
  }, [deleteFavourtieGaragesResponse]);

  const [search, setSearch] = useState(searchTerm);
  function onSearchChange(value) {
    setSearch(value);
  }

  function handleSearchSubmit() {
    // Handle the "Enter" click from the keyboard here
    // console.log('Search term:', search);
    setPage(0);
    dispatch(changeSearchTerm(search));
    setInitialFetchComplete(false);
  }

  function handleGarageClick(garage_id) {
    dispatch(changeRenderedGarageId(garage_id));
    dispatch(changePath('/garage'));
    dispatch(pushHistory('/garage'));
  }

  useEffect(() => {
    console.log(1111, searchResponse.originalArgs);
    if (!searchResponse.isUninitialized && !searchResponse.isLoading) {
      if (searchResponse.isError) {
        setErrors("Couldn't load garages");
      } else {
        if (page === 0 || !initialFetchComplete)
          dispatch(fetchSearchGarages(searchResponse.data));
        else dispatch(addBulkSearchGarages(searchResponse.data));
        setErrors();
        setInitialFetchComplete(true);
      }
    }
  }, [searchResponse]);

  console.log(searchedGarages.length);
  const renderItem = ({item}) => {
    const garageClickCallback = () => handleGarageClick(item.id);
    return (
      <TouchableOpacity onPress={garageClickCallback}>
        <View style={styles.itemContainer}>
          <ImageBackground
            source={{
              uri: 'https://drive.google.com/uc?id=1K46lRlholisxFEbShb1nR9YWHKTnApb6',
            }} // Replace with your Google Drive image link
            style={styles.itemBackground}>
            {isFavoriteObj[item.id] === true ? (
              <Button
                buttonText=""
                onClick={() => handleDeleteFavourites(item)}
                style={styles.favButton}
                styleCont={{marginTop: 1}}>
                <Icon name="favorite" size={30} color="#ccc" />
              </Button>
            ) : (
              <Button
                buttonText=""
                onClick={() => handleAddFavourites(item)}
                style={styles.favButton}
                styleCont={{marginTop: 1}}>
                <Icon name="favorite-outline" size={30} color="#ccc" />
              </Button>
            )}
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemDescription}>{item.area}</Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
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
      </View>
      <FlatList
        data={searchedGarages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContent}
        onEndReached={handleNextPage}
      />
      <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1f2937',
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    backgroundColor: '#1f2937',
  },
  favButton: {
    position: 'absolute', // Position the button absolutely within the container
    top: 10, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
    backgroundColor: '#24507b',
    padding: 4, // Adjust padding as needed to make the button smaller
    borderRadius: 5,
  },
  searchInput: {
    borderColor: '#24507b',
    borderWidth: 3,
    borderRadius: 5,
    color: '#24507b',
    marginRight: 0,
    width: '100%',
    fontFamily: 'italic',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#fff',
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
});

export default Search;
