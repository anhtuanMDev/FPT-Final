import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AxiosInstance from '../../AxiosInstance';

export type CreateRes = {
  name: string;
  introduction: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  state: string;
  city: string;
  status: string;
  ownerID: string;
};

interface Response {
  status: boolean;
  message: string;
  error?: string;
}

interface State {
  isCreating: boolean;
  isCreateSuccess: boolean;
  isCreateFail: boolean;
  isCreateError: string | undefined;
  response: Response | null;
}

const initialState: State = {
  isCreating: false,
  isCreateSuccess: false,
  isCreateFail: false,
  isCreateError: '',
  response: null,
};

const createResSlice = createSlice({
  name: 'createRes',
  initialState,
  reducers: {
    createResPending: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createResAsync.pending, state => {
        state.isCreating = true;
        state.isCreateError = '';
      })
      .addCase(
        createResAsync.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.isCreating = false;
          state.isCreateSuccess = true;
          state.isCreateFail = false;
          state.isCreateError = '';
          state.response = action.payload;
        },
      )
      .addCase(createResAsync.rejected, (state, action) => {
        state.isCreating = false;
        state.isCreateSuccess = false;
        state.isCreateFail = true;
        state.isCreateError = action.error.message;
        state.response = null;
      });
  },
});

const createResAsync = createAsyncThunk(
  'createRes/createResAsync',
  async (data: CreateRes) => {
    const response = await AxiosInstance().post('/create-res.php', data);
    return response.data;
  },
);
export const {createResPending} = createResSlice.actions;

export default createResSlice.reducer;
