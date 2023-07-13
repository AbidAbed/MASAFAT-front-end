import React from 'react';
import {Provider} from 'react-redux';
import {Store} from './Store/SotreInterface';
import Root from './Components/Root';
const App = () => {
  return (
    <Provider store={Store}>
      <Root />
    </Provider>
  );
};
export default App;
