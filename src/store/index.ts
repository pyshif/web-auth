import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import type { PreloadedState } from "@reduxjs/toolkit";
// slice
import authReducer from './features/authSlice';
import helpReducer from './features/helpSlice';

// root reducer
const rootReducer = combineReducers({
    auth: authReducer,
    help: helpReducer
});

// setupStore for testing
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
}

// store
// const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         help: helpReducer
//     }
// });
const store = configureStore({
    reducer: rootReducer
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;