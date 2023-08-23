import {Image, StyleSheet} from 'react-native';
import loadingGif from '../Assets/loading.gif';
function LoadingGif() {
  <Image source={require('../Assets/loading.gif')} style={styles.loadingGif} />;
}

const styles = StyleSheet.create({
  loadingGif: {width: 100, height: 100, resizeMode: 'contain'},
});
export default LoadingGif;
