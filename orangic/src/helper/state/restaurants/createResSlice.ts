import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AxiosInstance from '../../AxiosInstance';
import { AxiosResponse } from 'axios';

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

export interface Response {
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
  response: Response | null;
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
  },
  extraReducers: builder => {
    builder
      .addCase(createResAsync.pending, state => {
        console.log('is Pending');
        state.isCreatePending = true;
        state.isCreateError = '';
      })
      .addCase(
        createResAsync.fulfilled,
        (state, action: PayloadAction<AxiosResponse<Response>>) => {
          console.log("is Fulfilled");
          state.isCreatePending = false;
          state.isCreateFulfilled = true;
          state.isCreateReject = false;
          state.isCreateError = '';
          state.response = action.payload.data;
          console.log(action.payload.data);
        },
      )
      .addCase(createResAsync.rejected, (state, action) => {
        console.log('is Rejected');
        state.isCreatePending = false;
        state.isCreateFulfilled = false;
        state.isCreateReject = true;
        state.isCreateError = action.error.message;
        state.response = null;
        console.log(state.isCreateError);
      });
  },
});

export const createResAsync = createAsyncThunk(
  'createRes/createResAsync',
  async (data: CreateRes) => {
    console.log('data', data);
    const response = await AxiosInstance().post('/create-res.php', data);
    console.log('response', response);
    return response;
  },
);
export const {createResPending} = createResSlice.actions;

export default createResSlice.reducer;
