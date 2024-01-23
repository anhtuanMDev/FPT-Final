import {createSlice} from '@reduxjs/toolkit';
import AxiosInstance from '../../AxiosInstance';

interface State {
  isProgress: boolean;
  isCancel: boolean;
  isError: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  data: any[];
}

const initialState: State = {
  isProgress: false,
  isCancel: false,
  isError: false,
  isSuccess: false,
  isFailed: false,
  data: [],
};

const imagePickerSlice = createSlice({
  name: 'imagePicker',
  initialState,
  reducers: {
    uploadPending: state => {
      state.isProgress = true;
      state.isCancel = false;
      state.isError = false;
      state.isSuccess = false;
      state.isFailed = false;
    },
    uploadFulfilled: (state, action) => {
      state.isProgress = false;
      state.isCancel = false;
      state.isError = false;
      state.isSuccess = true;
      state.isFailed = false;
      state.data = action.payload;
    },
    uploadRejected: state => {
      state.isProgress = false;
      state.isCancel = false;
      state.isError = false;
      state.isSuccess = false;
      state.isFailed = true;
    },
    uploadCancel: state => {
      state.isProgress = false;
      state.isCancel = true;
      state.isError = false;
      state.isSuccess = false;
      state.isFailed = false;
    },
    uploadError: state => {
      state.isProgress = false;
      state.isCancel = false;
      state.isError = true;
      state.isSuccess = false;
      state.isFailed = false;
    },
  },
});

export const {
  uploadPending,
  uploadFulfilled,
  uploadRejected,
  uploadCancel,
  uploadError,
} = imagePickerSlice.actions;

export default imagePickerSlice.reducer; 