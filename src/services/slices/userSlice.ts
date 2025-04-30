import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  setCookieAuthResponse,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { RootState } from '../store';
import { deleteCookie } from '../../utils/cookie';

export const loginUser = createAsyncThunk(
  'user/login',
  async (user: TLoginData) => setCookieAuthResponse(await loginUserApi(user))
);
export const registerUser = createAsyncThunk(
  'user/register',
  async (user: TRegisterData) =>
    setCookieAuthResponse(await registerUserApi(user))
);
export const getUser = createAsyncThunk('user/get', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const logout = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();
  if (response.success) {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  }
});

type TUserState = {
  isAuthorized: boolean;
  user?: TUser;
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    isAuthorized: false
  } satisfies TUserState as TUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthorized = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthorized = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthorized = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthorized = false;
        state.user = undefined;
      });
  },
  selectors: {
    selectIsAuthorized: (state) => state.isAuthorized,
    selectUser: (state) => state.user
  }
});

export const { selectIsAuthorized, selectUser } = userSlice.getSelectors(
  (rootState: RootState) => rootState.user
);
