import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ResponseAPI } from '../Global/globalSlice';
import AxiosInstance from '../../AxiosInstance';

interface StoreState {
    restaurantID: string;
    restaurantStatus: string;
    restaurantName: string;
}

const initialState: StoreState = {
    restaurantID: '',
    restaurantStatus: '',
    restaurantName: '',
}

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setRestaurantID: (state, action) => {
            state.restaurantID = action.payload;
        },
        setRestaurantStatus: (state, action) => {
            state.restaurantStatus = action.payload;
        },
        setRestaurantName: (state, action) => {
            state.restaurantName = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRestaurantID.fulfilled, (state, action) => {
            state.restaurantID = action.payload;
        });
        builder.addCase(fetchRestaurantID.rejected, (state, action) => {
            state.restaurantID = '';
        });

        builder.addCase(fetchRestaurant.fulfilled, (state, action) => {
            console.log("action.payload:", action.payload)
            state.restaurantID = action.payload.Id;
            state.restaurantStatus = action.payload.Status;
            state.restaurantName = action.payload.Name;
        });
        builder.addCase(fetchRestaurant.rejected, (state, action) => {
            state.restaurantID = '';
            state.restaurantStatus = '';
            state.restaurantName = '';
        });

    }
})

export const fetchRestaurantID = createAsyncThunk('store/fetchRestaurantID',
    async (id: string) => {
        const response = await AxiosInstance().post('get-user-restaurant.php', { id });
        console.log("user res thunk:", response);
        return response.data.Id;
    });

export const fetchRestaurant = createAsyncThunk('store/fetchRestaurant',
    async (id: string) => {
        const response = await AxiosInstance().post('get-user-restaurant.php', { id });
        console.log("user res thunk:", response);
        return response.data;
    });

export const { setRestaurantID } = storeSlice.actions;
export const selectRestaurantID = (state: { store: StoreState }) => state.store.restaurantID;
export const selectRestaurantStatus = (state: { store: StoreState }) => state.store.restaurantStatus;
export const selectRestaurantName = (state: { store: StoreState }) => state.store.restaurantName;
export default storeSlice.reducer;