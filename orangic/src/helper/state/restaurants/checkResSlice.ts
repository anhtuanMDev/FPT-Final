import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AxiosInstances from '../../AxiosInstance';
import { AxiosResponse } from 'axios';

export interface CheckResponse {
  Id: string;
  Name: string;
  Introduction: string;
  Address: string;
  City: string;
  District: string;
  State: string;
  Email: string;
  Phone: string;
  Status: string;
}

export interface Response {
  status: boolean;
  message: string;
  response: CheckResponse;
  error?: string;
}

interface State {
  isChecked: boolean;
  isCheckPending: boolean;
  isCheckFulfilled: boolean;
  isCheckReject: boolean;
  isCheckError: string | undefined;
  response: Response | null;
}

const initialState: State = {
  isChecked: false,
  isCheckPending: false,
  isCheckFulfilled: false,
  isCheckReject: false,
  isCheckError: '',
  response: null,
};

const checkResSlice = createSlice({
  name: 'checkRes',
  initialState,
  reducers: {
    isCheckRes: (state, action: PayloadAction<boolean>) => {
      state.isChecked = action.payload;
    },
  },
  extraReducers: builder =>{
    builder.addCase(checkResAsync.pending, state => {
        state.isCheckPending = true;
        state.isCheckError = '';
        console.log("Checking")
    }).addCase(checkResAsync.fulfilled, (state, action: PayloadAction<AxiosResponse<Response>>) => {
        state.isCheckPending = false;
        state.isChecked = true;
        state.isCheckFulfilled = true;
        state.isCheckReject = false;
        state.isCheckError = '';
        state.response = action.payload.data;
        console.log("fulfilled",action.payload)
        console.log("fulfilled data",action.payload.data)
    }).addCase(checkResAsync.rejected, (state, action)=> {
        state.isCheckPending = false;
        state.isChecked = true;
        state.isCheckFulfilled = false;
        state.isCheckReject = true;
        state.isCheckError = action.error.message;
        state.response = null;
        console.log("not have")
    })
  }
});

export const checkResAsync = createAsyncThunk(
  'checkRes/checkResAsync',
  async (id: string) => {
    const response = await AxiosInstances().get('/get-res.php', {
      params: {ownerID: id},
    });
    return response;
  },
);

export const {isCheckRes} = checkResSlice.actions;

export default checkResSlice.reducer;
