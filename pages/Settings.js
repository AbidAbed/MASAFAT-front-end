import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import BackButton from '../Components/BackButton';
import Button from '../Components/Button';
import {useDispatch} from 'react-redux';
import {changePath, pushHistory} from '../Store/SotreInterface';
import ProfileIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryIcon from 'react-native-vector-icons/FontAwesome';
import FavoritesIcon from 'react-native-vector-icons/MaterialIcons';
import ReportIcon from 'react-native-vector-icons/MaterialIcons';
import AboutIcon from 'react-native-vector-icons/AntDesign';

function Settings() {
  const dispatch = useDispatch();
  function handleProfile() {
    dispatch(changePath('/profile'));
    dispatch(pushHistory('/profile'));
  }
  function handleHistory() {
    dispatch(changePath('/history'));
    dispatch(pushHistory('/history'));
  }
  function handleFavorites() {
    dispatch(changePath('/favorites'));
    dispatch(pushHistory('/favorites'));
  }
  function handleReportAnIssue() {
    dispatch(changePath('/report'));
    dispatch(pushHistory('/report'));
  }
  function handleAbout() {
    dispatch(changePath('/about'));
    dispatch(pushHistory('/about'));
  }
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Settings</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonText="Profile"
          onClick={handleProfile}
          style={styles.button}>
          <ProfileIcon name="account-circle" size={30} color="#ccc" />
        </Button>
        <Button
          buttonText="History"
          onClick={handleHistory}
          style={styles.button}>
          <HistoryIcon name="history" size={30} color="#ccc" />
        </Button>
        <Button
          buttonText="Favorites"
          onClick={handleFavorites}
          style={styles.button}>
          <FavoritesIcon name="favorite" size={30} color="#ccc" />
        </Button>
        <Button
          buttonText="Report an issue"
          onClick={handleReportAnIssue}
          style={styles.button}>
          <ReportIcon name="report-problem" size={30} color="#ccc" />
        </Button>
        <Button buttonText="About" onClick={handleAbout} style={styles.button}>
          <AboutIcon name="infocirlce" size={30} color="#ccc"/>
        </Button>
      </View>
      <BackButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1f2937',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 50,
    textAlign: 'left',
    color: '#ccc',
  },
  buttonContainer: {
    width: '100%',
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#24507b',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    flexDirection: 'row',
  },
});

export default Settings;
