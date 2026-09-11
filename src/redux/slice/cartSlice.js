import {createSlice} from "@reduxjs/toolkit"
const initialState={
    items:[],
};

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{state.items.push(action.payload)},
        icreaseQuantity:(state,action)=>{const item=state.items.find((item)=>String(item.id)==String(action.payload));
        if(item){
            item.quantity+=1
        }  //cart
    },
    decreaseQuantity:(state,action)=>{const item=state.items.find((item)=>String(item.id)==String(action.payload));
        if(item && item.quantity>1){
            item.quantity-=1;
        }    //cart
    },
    setCart:(state,action)=>{state.items=action.payload}
    },
})
export const{ addToCart,icreaseQuantity,decreaseQuantity,setCart }=cartSlice.actions;
export default cartSlice.reducer                        

