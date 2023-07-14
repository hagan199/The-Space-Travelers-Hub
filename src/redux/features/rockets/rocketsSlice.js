import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const rocketURL = 'https://api.spacexdata.com/v4/rockets';

export const fetchRockets = createAsyncThunk(
  'rokets/fetchRokets',
  async () => {
    try {
      const response = await axios.get(rocketURL);
      return response.data;
    } catch (error) {
      return error;
    }
  },
);
const initialState = {
  rockets: [],
  isLoading: false,
  error: undefined,
};

export const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    reserveRockets: (state, action) => {
      const id = action.payload;
      const newState = state.rockets.map((rocket) => {
        if (rocket.id !== id) return rocket;
        return { ...rocket, reserved: true };
      });
      return { ...state, rockets: newState };
    },
    cancelRockets: (state, action) => {
      const id = action.payload;
      const newState = state.rockets.map((rocket) => {
        if (rocket.id !== id) return rocket;
        return { ...rocket, reserved: false };
      });
      return { ...state, rockets: newState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rockets = action.payload;
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },

});
export const { reserveRockets, cancelRockets } = rocketsSlice.actions;
export default rocketsSlice.reducer;
