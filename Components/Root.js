import {useSelector} from 'react-redux';
import usePathNavigator from '../Hooks/usePathNavigator';
import {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native'; // Corrected import
import {useDispatch} from 'react-redux';
import {changeIsLocationGranted} from '../Store/SotreInterface'; // Fixed typo in import path
import Permissions from 'react-native-permissions';
const Root = () => {
  const {isLocationGranted} = useSelector(state => state.config);
  const dispatch = useDispatch();
  console.log(usePathNavigator())
  useEffect(() => {
    const checkLocationPermission = async () => {
      const status = await Permissions.check('location');
      dispatch(changeIsLocationGranted(status === 'authorized'));
    };
    checkLocationPermission();
    console.log('isLocationGranted', isLocationGranted);
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        dispatch(
          changeIsLocationGranted(
            granted === PermissionsAndroid.RESULTS.GRANTED,
          ),
        );
      } catch (error) {
        console.error('Error requesting location permission:', error);
      }
    };

    requestLocationPermission();
  }, []);

  return usePathNavigator();
};

export default Root;
