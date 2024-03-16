import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type RegisterState = {
    registerPending: boolean,
    registerFulfilled: boolean,
    registerReject: string,
}

const initialState: RegisterState = {
    registerPending: false,
    registerFulfilled: false,
    registerReject: '',
}

const registerSlice = createSlice({
    name: 'uploadSlice',
    initialState,
    reducers: {
        registerPending: (state, action: PayloadAction<boolean>) => {
            state.registerPending = action.payload
        },
        registerFulfilled: (state, action: PayloadAction<boolean>)=>{
            state.registerFulfilled = action.payload
        },
        registerReject: (state, action: PayloadAction<string>)=>{
            state.registerReject = action.payload
        }
    }
})

export const  {registerFulfilled, registerPending, registerReject } = registerSlice.actions;
export const selectRegisterFulfilled = (state: {register: RegisterState}) => state.register.registerFulfilled;
export const selectRegisterPending = (state: {register: RegisterState}) => state.register.registerPending;
export const selectRegisterReject = (state: {register: RegisterState}) => state.register.registerReject

export default registerSlice.reducer;