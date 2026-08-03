import { UserProfile } from "../types/profile-type";
import { createFeature, createReducer, on } from "@ngrx/store";
import { profileActions } from "./profile-actions";

export type ProfileState = {
  profile: UserProfile | null;
  error: string | null;
  isLoading: boolean;
};

const initialProfileState: ProfileState = {
  profile: null,
  error: null,
  isLoading: false,
};


export const profileFeature = createFeature({
name: 'profile',
reducer: createReducer(
  initialProfileState,
  on(profileActions.loadProfile, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(profileActions.loadProfileSuccess, (state, { profile }) => ({
    ...state,
    profile,
    isLoading: false,
  })),

  on(profileActions.loadProfileFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
)
})
