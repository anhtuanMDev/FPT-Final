import { configureStore } from "@reduxjs/toolkit";
import checkResSlice from "./restaurants/checkResSlice";
import createResSlice from "./restaurants/createResSlice";
import updateResSlice from "./restaurants/updateResSlice";
import imagePickerSlice from "./image/imagePickerSlice";


export const store = configureStore({
    reducer: {
        checkRes: checkResSlice,
        createRes: createResSlice,
        updateRes: updateResSlice,
        imagePicker: imagePickerSlice,
    }
})

/**
 * need to export these types to use in useSelector
 * RootState need for normal state
 * AppDispatch need for dispatch to work with Async state
*/

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;