import { combineReducers } from "@reduxjs/toolkit";

import userSlice from '../slices/userSlice'
import themeSlice from '../slices/theme'
import postSlice from '../slices/postSlice';

const rootReducer = combineReducers({
    user: userSlice,
    theme:themeSlice,
    posts:postSlice
});

export { rootReducer}