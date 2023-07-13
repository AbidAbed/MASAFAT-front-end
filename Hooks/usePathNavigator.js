import {useSelector} from 'react-redux';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import RePass from '../pages/RePass';
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
