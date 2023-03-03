import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {profileReducer} from "./profileReducer";

export const rootReducer = combineReducers({
        profile: profileReducer
    }
)

export type AppStoreType = ReturnType<typeof store.getState>
export const store = createStore(rootReducer, applyMiddleware(thunk))


export type AppActionTypes = AnyAction
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStoreType, unknown, AnyAction>


export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppDispatch = ThunkDispatch<AppStoreType, unknown, AppActionTypes>