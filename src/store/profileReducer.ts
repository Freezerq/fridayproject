import {AnyAction} from "redux";
import {AppThunk} from "./store";

//actions
// export const setAppErrorAC = (error: null | string) => ({type: 'SET_ERROR', error} as const)

//reducer
const initialState:InitialStateType = {}
export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionTypes): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}


//thunks
export const initializeAppTC = (): AppThunk => (dispatch) => {
    // dispatch(setAppStatusAC('loading'))
    // authAPI.me()
    //     .then((res) => {
    //         dispatch(setAppStatusAC('idle'))
    //         dispatch(setAppInitializeAC(true))
    //         // dispatch(setUserIdAC(777))
    //     })
}




//types
type ProfileActionTypes = AnyAction
type InitialStateType = {}

