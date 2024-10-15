import { configureStore } from "@reduxjs/toolkit";
import plantReducer from '../features/plants'
import authReducer from  "../features/auth"

export const store = configureStore({
    reducer:{
        plantReducer,
        authReducer
    }
})