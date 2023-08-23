import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BackButton from '../Components/BackButton';
import Menu from '../Components/Menu';

function About() {
  return (
    <View style={styles.container}>
      <View style={styles.barView}>
        <BackButton />
        <Text style={styles.text}>Report an Issue</Text>
        <Menu />
      </View>
      <View style={styles.content}>
        <View style={styles.teamSection}>
          <Text style={styles.sectionTitle}>Created by Frontend Team:</Text>
          <Text style={styles.memberText}>- Abid Abed</Text>
          <Text style={styles.memberText}>- Ahmad Abu Al Fool</Text>
        </View>
        <View style={styles.teamSection}>
          <Text style={styles.sectionTitle}>Backend Team:</Text>
          <Text style={styles.memberText}>- Osama Faza</Text>
          <Text style={styles.memberText}>- Abdullah Jelani</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1f2937',
    justifyContent: 'center', // Center content vertically
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff',
    position: 'absolute',
    marginLeft: '20%',
  },
  barView: {
    flexDirection: 'row', // Align elements horizontally
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: '2%',
    position: 'absolute',
    top: '3%',
    left: '5%',
    zIndex: 1,
  },
  content: {
    flex: 1, // Take remaining space
    justifyContent: 'center', // Center content vertically
  },
  teamSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  memberText: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
    color: '#ccc',
  },
});

export default About;
