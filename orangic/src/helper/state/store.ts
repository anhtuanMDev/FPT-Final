import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./userStack/login/loginSlice";
import uploadFileSlice from "./userStack/register/uploadFileSlice";
import registerSlice from "./userStack/register/registerSlice";
import addressSlice from "./appTab/addressSlice";


export const store = configureStore({
    reducer: {
        // add reducer here
        login: loginSlice,
        upload: uploadFileSlice,
        register: registerSlice,
        address: addressSlice
    }
})

/**
 * need to export these types to use in useSelector
 * RootState need for normal state
 * AppDispatch need for dispatch to work with Async state
*/

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;