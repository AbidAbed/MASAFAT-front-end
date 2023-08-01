import BackButton from '../Components/BackButton';

import {View, StyleSheet} from 'react-native';

function Search() {
  console.log(1);
  return (
    <View style={styles.container}>
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
});
export default Search;
