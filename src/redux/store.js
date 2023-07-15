import { configureStore } from '@reduxjs/toolkit';
import rocketsReducer from './features/rockets/rocketsSlice';
import missionsReducer from './features/missions/missionsSlice';

// Create the Redux store with the combined reducers
export default configureStore({
  reducer: {
    rockets: rocketsReducer, // Reducer for rockets feature
    missions: missionsReducer, // Reducer for missions feature
  },
});
