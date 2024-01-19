import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AxiosInstances from '../../AxiosInstance';

interface Response {
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

interface State {
  isChecked: boolean;
  isChecking: boolean;
  isCheckSuccess: boolean;
  isCheckFail: boolean;
  isCheckError: string | undefined;
  response: Response | null;
}

const initialState: State = {
  isChecked: false,
  isChecking: false,
  isCheckSuccess: false,
  isCheckFail: false,
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
        state.isChecking = true;
        state.isCheckError = '';
    }).addCase(checkResAsync.fulfilled, (state, action: PayloadAction<Response>) => {
        state.isChecking = false;
        state.isChecked = true;
        state.isCheckSuccess = true;
        state.isCheckFail = false;
        state.isCheckError = '';
        state.response = action.payload;
    }).addCase(checkResAsync.rejected, (state, action)=> {
        state.isChecking = false;
        state.isChecked = true;
        state.isCheckSuccess = false;
        state.isCheckFail = true;
        state.isCheckError = action.error.message;
        state.response = null;
    })
  }
});

export const checkResAsync = createAsyncThunk(
  'checkRes/checkResAsync',
  async (id: string) => {
    const response = await AxiosInstances().get('/get-res.php', {
      params: {ownerID: id},
    });
    return response.data;
  },
);

export const {isCheckRes} = checkResSlice.actions;

export default checkResSlice.reducer;
