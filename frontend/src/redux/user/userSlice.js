import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser:null,
    address:null,
    error:null,
    loading:false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart : (state) => {
            state.loading = true
        },
        signinSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signinFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart:(state)=>{
            state.loading = true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        deleteUserStart:(state)=>{
            state.loading = true;
        },
        deleteUserSuccess:(state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        signOutUserStart:(state)=>{
            state.loading = true;
        },
        signOutUserSuccess:(state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signOutFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        reset:(state)=>{
            state.currentUser = null
        }
    }
})

export const {
    signOutFailure,
    reset,
    signOutUserStart,
    signOutUserSuccess,
    deleteUserSuccess,
    deleteUserStart,
    deleteFailure,
    updateFailure,
    updateUserStart,
    updateUserSuccess,
    signinFailure,
    signinStart,
    signinSuccess} = userSlice.actions
export default userSlice.reducer