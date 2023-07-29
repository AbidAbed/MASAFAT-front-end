import usePathNavigator from '../Hooks/usePathNavigator';
import {usePostAuthMutation} from '../Store/SotreInterface';
import {useEffect} from 'react';
const Root = () => {
  //auth using token and JWT 
  // const [postAuth, result] = usePostAuthMutation();
  // useEffect(() => {
  //   postAuth();
  // }, []);
  // useEffect(() => {
  //   if (!result.isUninitialized && !result.isLoading) {
  //     console.log(result);
  //   }
  // }, [result]);
  return usePathNavigator();
};
export default Root;
