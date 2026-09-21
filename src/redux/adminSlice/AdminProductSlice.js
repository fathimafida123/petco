
import { createSlice } from "@reduxjs/toolkit";
const AdminProductSlice = createSlice({
    name: "adminProducts", initialState: {
        products: [],
        loading: false, error: null
    }, reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },

        addProduct: (state, action) => {
            state.products.push(action.payload)
        },
        updateProduct: (state, action) => {
            state.products = state.products.map((product) =>
                product.id === action.payload.id ? action.payload : product)
        },
        softDeleteProductSlice: (state, action) => {
            const product = state.products.find((product) => product.id === action.payload)
            if (product) {
                product.deleted = true
            }
        },
        deleteProduct: (state, action) => {
            state.products = state.products.filter((product) => product.id!== action.payload)
        }
    },
}
);
export const {
    setProducts,
    setError, setLoading,
    addProduct,
    updateProduct, softDeleteProductSlice, deleteProduct
} = AdminProductSlice.actions;
export default AdminProductSlice.reducer;