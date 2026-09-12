import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {


    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => String(item.id) === String(action.payload.id)
      );

      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => String(item.id) == String(action.payload))
      if (item) {

        item.quantity += 1
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => String(item.id) == String(action.payload));
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }    //cart
    },
    removeFromCart:(state,action)=>{state.items=state.items.filter((item)=>String(item.id)!==String(action.payload))},
    setCart: (state, action) => { state.items = action.payload }
  },

})
export const { addToCart, increaseQuantity, decreaseQuantity, setCart,removeFromCart } = cartSlice.actions;
export default cartSlice.reducer

