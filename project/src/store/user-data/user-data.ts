import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../consts';
import { UserData } from '../../types/user-data';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, { payload }: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = payload;
    },
    setUserData: (state, { payload }: PayloadAction<UserData>) => {
      state.userData = payload;
    }
  }
});

export const {
  requireAuthorization,
  setUserData
} = userData.actions;
