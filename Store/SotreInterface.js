import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {
  ConfigSlice,
  changePath,
  puchHistory,
  popHistory,
} from './Slices/ConfigSlice';
const Store = configureStore({
  reducer: {config: ConfigSlice.reducer},
});
setupListeners(Store.dispatch);
export {Store, changePath, puchHistory, popHistory};
