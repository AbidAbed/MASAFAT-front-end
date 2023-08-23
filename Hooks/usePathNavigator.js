import {useSelector} from 'react-redux';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import RePass from '../pages/RePass';
import Map from '../pages/Map';
import Search from '../pages/Search';
import Settings from '../pages/Settings';
import Garage from '../pages/Garage';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import SelectGarage from '../pages/SelectGarage';
import History from '../pages/History';
import Report from '../pages/Report';
import About from '../pages/About';
import Payment from '../pages/Payment';
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
    case '/search':
      return <Search />;
    case '/settings':
      return <Settings />;
    case '/garage':
      return <Garage />;
    case '/favorites':
      return <Favorites />;
    case '/profile':
      return <Profile />;
    case '/garage/select':
      return <SelectGarage />;
    case '/history':
      return <History />;
    case '/report':
      return <Report />;
    case '/about':
      return <About />;
    case '/payment':
      return <Payment />;
    default:
      return <Login />;
  }
}
export default usePathNavigator;
