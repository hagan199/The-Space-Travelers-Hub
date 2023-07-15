import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const missionsURL = 'https://api.spacexdata.com/v3/missions';

export const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  const response = await axios.get(missionsURL);
  return response.data;
});

const initialState = {
  missions: [],
  isLoading: false,
  error: null,
};

export const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    reserveMission: (state, action) => {
      const id = action.payload;
      state.missions = state.missions.map((mission) => {
        if (mission.mission_id !== id) return mission;
        return { ...mission, reserved: true };
      });
    },
    leaveMission: (state, action) => {
      const id = action.payload;
      state.missions = state.missions.map((mission) => {
        if (mission.mission_id !== id) return mission;
        return { ...mission, reserved: false };
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.missions = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { reserveMission, leaveMission } = missionsSlice.actions;
export default missionsSlice.reducer;
