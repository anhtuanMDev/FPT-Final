import { createSlice } from "@reduxjs/toolkit";

type AddressState = {
    addressOwner: string;
    addressPending: boolean;
    addressFulfilled: boolean;
    addressReject: boolean;
}

const initialState: AddressState = {
    addressOwner: '',
    addressPending: false,
    addressFulfilled: false,
    addressReject: false,
}

const addressSlice = createSlice({
    name: 'addressSlice',
    initialState,
    reducers:{
        setAddressOwner: (state, action) => {
            state.addressOwner = action.payload;
        },
        setAddressPending: (state, action) => {
            state.addressPending = action.payload;
        },
        setAddressFulfilled: (state, action) => {
            state.addressFulfilled = action.payload;
        },
        setAddressReject: (state, action) => {
            state.addressReject = action.payload;
        }
    }
})

export const { setAddressOwner, setAddressPending, setAddressFulfilled, setAddressReject } = addressSlice.actions;
export const selectAddressOwner = (state: {address: AddressState}) => state.address.addressOwner;
export const selectAddressPending = (state: {address: AddressState}) => state.address.addressPending;
export const selectAddressFulfilled = (state: {address: AddressState}) => state.address.addressFulfilled;
export const selectAddressReject = (state: {address: AddressState}) => state.address.addressReject;
export default addressSlice.reducer;