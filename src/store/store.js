import { configureStore } from "@reduxjs/toolkit";
//import cartSlice from "./features/cartSlice";
//import productSlice from "./features/productSlice";
import authReducer from './features/authReducer'
import userReducer from "./features/userReducer";
import donateSlice from "./features/donateReducer";
import cartReducer from "./features/cartReducer";
import wishlistReducer from "./features/wishlistReducer";
import localReducer from "./features/localReducer";

const store = configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        donate:donateSlice,
        cart:cartReducer,
        wishlist:wishlistReducer,
        local:localReducer,
    }
})

export default store;
