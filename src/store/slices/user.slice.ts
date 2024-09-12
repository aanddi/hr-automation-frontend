import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { getLocalStorage } from '@common/utils';

export interface IUser {
  isAuthorized: boolean;
}

interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {
  user: getLocalStorage('user'),
};

const loginValue = import.meta.env.VITE_AUTH_LOGIN;
const passwordValue = import.meta.env.VITE_AUTH_PASSWORD;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(_state, action) {
      if (loginValue !== action.payload.login || passwordValue !== action.payload.password) {
        toast.error('Неправильный логин или пароль');

        return {
          ..._state,
        };
      }

      toast.success('Вы вошли в систему');

      return {
        ..._state,
        user: {
          isAuthorized: true,
        },
      };
    },

    logout(_state) {
      toast.success('Вы вышли из системы');
      return {
        ..._state,
        user: null,
      };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
