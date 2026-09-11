import {createSlice} from "@reduxjs/toolkit"
const initialState={
    items:[],
};

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
    //     addToCart:(state,action)=>{state.items.push(action.payload)},
    //     icreaseQuantity:(state,action)=>{const item=state.items.find((item)=>String(item.id)==String(action.payload));
    //     if(item){
    //         item.quantity+=1
    //     }  //cart
    // },
  
    addToCart: (state, action) => {
  const existingItem = state.items.find(
    (item) => String(item.id) === String(action.payload.id)
  );

  if (existingItem) {
    existingItem.quantity += action.payload.quantity;
  } else {
    state.items.push(action.payload);
  }
},
increaseQuantity:(state,action)=>{const item=state.items.find((item)=>String(item.id)==String(action.payload))
  if(item){

    item.quantity+=1
  }
},
    decreaseQuantity:(state,action)=>{const item=state.items.find((item)=>String(item.id)==String(action.payload));
        if(item && item.quantity>1){
            item.quantity-=1;
        }    //cart
    },
    setCart:(state,action)=>{state.items=action.payload}
    },
})
export const{ addToCart,increaseQuantity,decreaseQuantity,setCart }=cartSlice.actions;
export default cartSlice.reducer                        

