import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AxiosInstance from '../../AxiosInstance';
import { AxiosResponse } from 'axios';
import { create } from 'react-test-renderer';

export type CreateRes = {
  name: string;
  introduction: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  ward: string;
  city: string;
  status: string;
  ownerID: string;
};

export interface CreateResResponse {
  id: string;
  status: boolean;
  message: string;
  error?: string;
}

interface State {
  isCreatePending: boolean;
  isCreateFulfilled: boolean;
  isCreateReject: boolean;
  isCreateError: string | undefined;
  response: CreateResResponse | null;
}

const initialState: State = {
  isCreatePending: false,
  isCreateFulfilled: false,
  isCreateReject: false,
  isCreateError: '',
  response: null,
};

const createResSlice = createSlice({
  name: 'createRes',
  initialState,
  reducers: {
    createResPending: (state, action: PayloadAction<boolean>) => {
      state.isCreatePending = action.payload;
    },
    createResFulFilled: (state, action: PayloadAction<boolean>) => {
      state.isCreateFulfilled = action.payload;
    },
    createResReject: (state, action: PayloadAction<boolean>) => {
      state.isCreateReject = action.payload;
    },
    createResError: (state, action: PayloadAction<string>) => {
      state.isCreateError = action.payload;
    },
    createResResponse: (state, action: PayloadAction<CreateResResponse>) => {
      state.response = action.payload;
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(createResAsync.pending, state => {
  //       console.log('is Pending');
  //       state.isCreatePending = true;
  //       state.isCreateError = '';
  //     })
  //     .addCase(
  //       createResAsync.fulfilled,
  //       (state, action: PayloadAction<AxiosResponse<Response>>) => {
  //         console.log("is Fulfilled");
  //         state.isCreatePending = false;
  //         state.isCreateFulfilled = true;
  //         state.isCreateReject = false;
  //         state.isCreateError = '';
  //         state.response = action.payload.data;
  //         console.log(action.payload.data);
  //       },
  //     )
  //     .addCase(createResAsync.rejected, (state, action) => {
  //       console.log('is Rejected');
  //       state.isCreatePending = false;
  //       state.isCreateFulfilled = false;
  //       state.isCreateReject = true;
  //       state.isCreateError = action.error.message;
  //       state.response = null;
  //       console.log(state.isCreateError);
  //     });
  // },
});

// export const createResAsync = createAsyncThunk(
//   'createRes/createResAsync',
//   async (data: CreateRes) => {
//     console.log('data', data);
//     const response = await AxiosInstance().post('/create-res.php', data);
//     console.log('response', response);
//     return response;
//   },
export const {createResPending, createResFulFilled, createResError, createResReject, createResResponse} = createResSlice.actions;
export const selectCreateRes = (state: {createRes: State}) => state.createRes;
export const selectCreateResPending = (state: {createRes: State}) => state.createRes.isCreatePending;
export const selectCreateResFulFilled = (state: {createRes: State}) => state.createRes.isCreateFulfilled;
export const selectCreateResReject = (state: {createRes: State}) => state.createRes.isCreateReject;
export const selectCreateResError = (state: {createRes: State}) => state.createRes.isCreateError;
export const selectCreateResResponse = (state: {createRes: State}) => state.createRes.response;


export default createResSlice.reducer;
