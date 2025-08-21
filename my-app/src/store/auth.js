import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

const initialAuthState = user || {
  enteredValues: { email: '', password: '' },
  isLogin: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setEnteredValues(state, action) {
      const { identifier, value } = action.payload;
      state.enteredValues[identifier] = value;
      state.isLogin = true;

      if (
        state.enteredValues.email === 'bla@gmail.com' &&
        state.enteredValues.password === 'bla12345'
      ) {
        state.isAdmin = true;
      }

      localStorage.setItem(
        'user',
        JSON.stringify({
          isLogin: state.isLogin,
          isAdmin: state.isAdmin,
          enteredValues: { email: state.enteredValues.email },
        })
      );
    },
    logOut(state) {
      state.enteredValues.email = '';
      state.enteredValues.password = '';
      state.isLogin = false;
      state.isAdmin = false;
      localStorage.removeItem('user');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
