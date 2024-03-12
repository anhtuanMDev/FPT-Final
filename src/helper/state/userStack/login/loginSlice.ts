import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type LoginState = {
    isLogin: boolean;
    isLoginPending: boolean;
    isLoginFulfilled: boolean;
    isLoginReject: boolean;
    userID: string;
}

const initialState: LoginState = {
    isLogin: false,
    isLoginPending: false,
    isLoginFulfilled: false,
    isLoginReject: false,
    userID: '',
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        isLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        },
        isLoginPending: (state, action: PayloadAction<boolean>) => {
            state.isLoginPending = action.payload;
        },
        isLoginFulfilled: (state, action: PayloadAction<boolean>) => {
            state.isLoginFulfilled = action.payload;
        },
        isLoginReject: (state, action: PayloadAction<boolean>) => {
            state.isLoginReject = action.payload;
        },
        setUserID: (state, action: PayloadAction<string>) => {
            state.userID = action.payload;
        }
    }
})

export const { isLogin, isLoginPending, isLoginFulfilled, isLoginReject, setUserID } = loginSlice.actions;
export const selectIsLogin = (state: {login: LoginState}) => state.login.isLogin;
export const selectIsLoginPending = (state: {login: LoginState}) => state.login.isLoginPending;
export const selectIsLoginFulfilled = (state: {login: LoginState}) => state.login.isLoginFulfilled;
export const selectIsLoginReject = (state: {login: LoginState}) => state.login.isLoginReject;
export const selectUserID = (state: {login: LoginState}) => state.login.userID;

export default loginSlice.reducer;