import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "products",
    initialState: {
        allProducts: [],
        cart: []
    },
    reducers: {
        setProduct: (state, action) => {
            // console.log("Reducer received:", action.payload.length);
            state.allProducts = action.payload
        },
        setCart: (state, action) => {
            state.cart = action.payload
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(
                item => item.productId !== action.payload
            );
        }

    }
})

// Export actions (to use in components)
export const { setProduct } = productSlice.actions;
export const { setCart } = productSlice.actions;
export const { removeFromCart } = productSlice.actions;

// Export reducer (to register in store)
export default productSlice.reducer;