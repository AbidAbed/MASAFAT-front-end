import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import BackButton from '../Components/BackButton';
import Menu from '../Components/Menu';

function Report() {
  const [issue, setIssue] = useState('');
  const [email, setEmail] = useState('');

  const handleIssueChange = text => {
    setIssue(text);
  };

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handleReportIssue = () => {
    setIssue('');
    setEmail('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.barView}>
        <BackButton />
        <Text style={styles.text}>Report an Issue</Text>
        <Menu />
      </View>
      <View style={styles.viewContainer}></View>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Describe the issue..."
        value={issue}
        onChangeText={handleIssueChange}
      />
      <TextInput
        style={styles.input}
        placeholder="Your email"
        value={email}
        onChangeText={handleEmailChange}
      />
      <Button title="Report Issue" onPress={handleReportIssue} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    paddingBottom: 20,
    marginTop: 100,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1f2937',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: '#ccc',
    position: 'absolute',
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
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    height: 150,
    textAlignVertical: 'top',
  },
});

export default Report;
