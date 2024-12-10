import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Profile {
  profileId: string;
  title: string;
}

export interface ProfileState {
  profiles: Profile[];
}

const initialState: ProfileState = {
  profiles: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfiles: (state, action: PayloadAction<Profile[]>) => {
      state.profiles = action.payload;
    },
    removeProfiles: (state) => {
      state.profiles = [];
    },
    addNewProfile: (state, action: PayloadAction<Profile>) => {
      state.profiles.push({
        profileId: action.payload.profileId,
        title: action.payload.title,
      });
    },
    removeProfile: (state, action: PayloadAction<string>) => {
      state.profiles = state.profiles.filter(
        (profile) => profile.profileId !== action.payload,
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProfiles, removeProfiles, addNewProfile, removeProfile } =
  profileSlice.actions;

export default profileSlice.reducer;
