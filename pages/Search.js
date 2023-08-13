import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BackButton from '../Components/BackButton';
import {
  changeSearchGarages,
  useGetSearchGaragesQuery,
  changeSearchTerm,
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
function Search() {
  const searchTerm = useSelector(state => state.config.searchTerm);
  const searchedGarages = useSelector(state => state.garages.searchGarages);
  const [errors, setErrors] = useState();
  const searchResponse = useGetSearchGaragesQuery({query: searchTerm});

  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  function onSearchChange(value) {
    setSearch(value);
  }

  function handleSearchSubmit() {
    // Handle the "Enter" click from the keyboard here
    console.log('Search term:', search);
    dispatch(changeSearchTerm(search));
  }

  function handleGarageClick(garage_id) {
    console.log(garage_id);
  }
  useEffect(() => {
    if (!searchResponse.isUninitialized && !searchResponse.isLoading) {
      if (searchResponse.isError) {
        setErrors("Couldn't load garages");
      } else {
        setErrors();
        dispatch(changeSearchGarages(searchResponse.data));
      }
    }
  }, [searchResponse]);

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
      />
      <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1f2937',
  },
  inputContainer: {
    backgroundColor: '#1f2937',
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
