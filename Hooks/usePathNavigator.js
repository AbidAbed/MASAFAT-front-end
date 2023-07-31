import {useSelector} from 'react-redux';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import RePass from '../pages/RePass';
import Map from '../pages/Map';
function usePathNavigator() {
  const {path} = useSelector(state => state.config);
  switch (path) {
    case '/login':
      return <Login />;
    case '/signup':
      return <Signup />;
    case '/map':
      return <Map />;
    case '/rePass':
      return <RePass />;
    default:
      return <Login />;
  }
}
export default usePathNavigator;
