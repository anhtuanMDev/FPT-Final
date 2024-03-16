import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type ForgotPassState = {
    isForgotPass: boolean;
    isForgotPassPending: boolean;
    isForgotPassFulfilled: boolean;
    isForgotPassReject: boolean;
    userID: string;
}

const initialState: ForgotPassState = {
    isForgotPass: false,
    isForgotPassPending: false,
    isForgotPassFulfilled: false,
    isForgotPassReject: false,
    userID: '',
};

const forgotpassSlice = createSlice({
    name: 'forgotpass',
    initialState,
    reducers: {
        isForgotPass: (state, action: PayloadAction<boolean>) => {
            state.isForgotPass = action.payload;
        },
        isForgotPassPending: (state, action: PayloadAction<boolean>) => {
            state.isForgotPassPending = action.payload;
        },
        isForgotPassFulfilled: (state, action: PayloadAction<boolean>) => {
            state.isForgotPassFulfilled = action.payload;
        },
        isForgotPassReject: (state, action: PayloadAction<boolean>) => {
            state.isForgotPassReject = action.payload;
        },
        setUserID: (state, action: PayloadAction<string>) => {
            state.userID = action.payload;
        }
    }
})

export const { isForgotPass, isForgotPassPending, isForgotPassFulfilled, isForgotPassReject, setUserID } = forgotpassSlice.actions;
export const selectIsForgotPass = (state: {forgotpass: ForgotPassState}) => state.forgotpass.isForgotPass;
export const selectIsForgotPassPending = (state: {forgotpass: ForgotPassState}) => state.forgotpass.isForgotPassPending;
export const selectIsForgotPassFulfilled = (state: {forgotpass: ForgotPassState}) => state.forgotpass.isForgotPassFulfilled;
export const selectIsForgotPassReject = (state: {forgotpass: ForgotPassState}) => state.forgotpass.isForgotPassReject;
export const selectUserID = (state: {forgotpass: ForgotPassState}) => state.forgotpass.userID;

export default forgotpassSlice.reducer;