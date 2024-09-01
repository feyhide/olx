import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userRef: "",
    items : []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        
        reset:(state)=>{
            state = initialState
        }
    }
})

export const {} = cartSlice.actions
export default cartSlice.reducer