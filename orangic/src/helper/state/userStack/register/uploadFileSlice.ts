import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type UploadState = {
    uploaded: boolean,
    uploadPending: boolean,
    uploadReject: string,
    uploadFulfilled: boolean
}

const initialState: UploadState = {
    uploaded: false,
    uploadFulfilled: false,
    uploadPending: false,
    uploadReject: ''
}

const uploadSlice = createSlice({
    name: 'uploadSlice',
    initialState,
    reducers: {
        uploaded: (state, action: PayloadAction<boolean>)=>{
            state.uploaded = action.payload
        },
        uploadPending: (state, action: PayloadAction<boolean>) => {
            state.uploadPending = action.payload
        },
        uploadReject: (state, action: PayloadAction<string>)=>{
            state.uploadReject = action.payload
        },
        uploadFulfilled: (state, action: PayloadAction<boolean>)=>{
            state.uploadFulfilled = action.payload
        }
    }
})

export const  {uploaded, uploadFulfilled, uploadPending, uploadReject } = uploadSlice.actions;
export const selectUpload = (state: {upload: UploadState})=> state.upload.uploaded;
export const selectUploadFulfilled = (state: {upload: UploadState}) => state.upload.uploadFulfilled;
export const selectUploadPending = (state: {upload: UploadState}) => state.upload.uploadPending;
export const selectUploadReject = (state: {upload: UploadState}) => state.upload.uploadReject

export default uploadSlice.reducer;