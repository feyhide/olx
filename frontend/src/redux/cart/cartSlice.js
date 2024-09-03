import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userRef: "",
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addUsertoCart: (state, action) => {
            state.userRef = action.payload;
        },
        addProducttoCart: (state, action) => {
            const { product, quantity, size } = action.payload;
            const quantityInt = parseInt(quantity, 10);

            // Check if a product with the same size is already in the cart
            const existingProduct = state.items.find(item => 
                item.product._id === product._id && item.selectedSize._id === size._id
            );

            if (existingProduct) {
                existingProduct.quantity += quantityInt;
            } else {
                state.items.push({ 
                    product, 
                    quantity: quantityInt, 
                    selectedSize: size
                });
            }
        },
        removeProductFromCart: (state, action) => {
            const { productId } = action.payload;
            state.items = state.items.filter(item => item.product._id !== productId);
        },
        reset: (state) => {
            state.userRef = initialState.userRef;
            state.items = initialState.items;
        }
    }
});

export const { addUsertoCart, addProducttoCart, removeProductFromCart, reset } = cartSlice.actions;

export default cartSlice.reducer;
