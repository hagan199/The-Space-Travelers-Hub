import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const missionsURL = 'https://api.spacexdata.com/v3/missions';

export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async () => {
    try {
      const response = await axios.get(missionsURL);
      return response.data;
    } catch (error) {
      return error;
    }
  },
);
const initialState = {
  missions: [],
  isLoading: false,
  error: undefined,
};

export const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    reserveMission: (state, action) => {
      const id = action.payload;
      const newState = state.missions.map((mission) => {
        if (mission.mission_id !== id) return mission;
        return { ...mission, reserved: true };
      });
      return { ...state, missions: newState };
    },
    leaveMission: (state, action) => {
      const id = action.payload;
      const newState = state.missions.map((mission) => {
        if (mission.mission_id !== id) return mission;
        return { ...mission, reserved: false };
      });
      return { ...state, missions: newState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.missions = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },

});

export const { reserveMission, leaveMission } = missionsSlice.actions;
export default missionsSlice.reducer;
