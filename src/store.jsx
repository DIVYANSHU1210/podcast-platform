import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import podcastReducer from "./slices/podcastSlice";

let store = configureStore({
    reducer : {
        User : userReducer,
        podcasts : podcastReducer,
    }
});


export default store;