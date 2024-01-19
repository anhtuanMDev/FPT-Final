import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import AxiosInstance from '../../AxiosInstance';

export type UpdateRes = {
    name: string;
    introduction: string;
    email: string;
    phone: string;
    address: string;
    district: string;
    state: string;
    city: string;
    status: string;
}

interface Response {
    status: string;
    message: string;
    error?: string;
}

interface State {
    isUpdating: boolean;
    isUpdateSuccess: boolean;
    isUpdateFailed: boolean;
    response: Response | null;
}

const initialState: State = {
    isUpdating: false,
    isUpdateSuccess: false,
    isUpdateFailed: false,
    response: null
}

const updateResSlice = createSlice({
    name: 'updateRes',
    initialState,
    reducers: {
        updateResPending: (state) => {
            state.isUpdating = true;
            state.isUpdateSuccess = false;
            state.isUpdateFailed = false;
            state.response = null;
        }
    },
    extraReducers: builder => {
        builder.addCase(updateResAsync.pending, state => {
            state.isUpdating = true;
            state.isUpdateSuccess = false;
            state.isUpdateFailed = false;
            state.response = null;
        }).addCase(updateResAsync.fulfilled, (state, action: PayloadAction<Response>) => {
            state.isUpdating = false;
            state.isUpdateSuccess = true;
            state.isUpdateFailed = false;
            state.response = action.payload;
        }).addCase(updateResAsync.rejected, (state) => {
            state.isUpdating = false;
            state.isUpdateSuccess = false;
            state.isUpdateFailed = true;
            state.response = null;
        })
    }
})

const updateResAsync = createAsyncThunk(
    'updateRes/updateResAsync',
    async (datas: {id: string, updateRes: UpdateRes}) => {
        const response = await AxiosInstance().put('/update-res.php',{params: {id: datas.id}, data: datas.updateRes});
        return response.data;
    }
)