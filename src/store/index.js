import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from './slices/wishlist';

export default configureStore({
    reducer: {
        wishlist: wishlistSlice
    }
})
