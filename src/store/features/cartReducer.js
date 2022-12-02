import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCart = createAsyncThunk('cart/getCart', async ({ userId }) => {
  const response = await fetch('https://human-relief-api.herokuapp.com/api/getCart/'+userId).then(res => res.json());
  return response;
}); 

export const deleteCart = createAsyncThunk('cart/deleteCart', async ({ cartId }) => {
  const response = await fetch('https://human-relief-api.herokuapp.com/api/deleteCart/'+cartId,{
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
  return response;
});  

export const addToCart = createAsyncThunk('cart/addToCart', async ({ title,image,productId,userId,price }) => {
  const response = await fetch('https://human-relief-api.herokuapp.com/api/addToCart',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({ 
      "title":title,
      "image":image,
      "productId":productId,
      "userId":userId,
      "price":price
    })
  }).then(res => res.json());
  return response;
});

/*
export const updateProfile = createAsyncThunk('user/updateProfile', async (fieldName,logedinUserId) => {
  console.log(logedinUserId);
  console.log(fieldName);
  const response = await fetch('https://human-relief-api.herokuapp.com/api/users/update/'+logedinUserId, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify(fieldName)
  }).then(res => res.json());
  return response;
});

*/

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartData : [],
    loading: false,
    updateAcknowledged:null,
    userCurrentId:null,
    error: ""
  },
  reducers: {
  },
  extraReducers: {
    //Load Profile
    [getCart.pending]: (state, action) => {
      state.loading = true
    },
    [getCart.fulfilled]: (state, action) => {
      state.loading = false;
      state.cartData = action.payload;
    },
    [getCart.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },
    
    //Update Profile
    [addToCart.pending]: (state, action) => {
      state.loading = true
    },
    [addToCart.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [addToCart.rejected]: (state, action) => {
      state.loading = false
    },

    [deleteCart.pending]: (state, action) => {
      state.loading = true
    },
    [deleteCart.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [deleteCart.rejected]: (state, action) => {
      state.loading = false
    },
  }
})

export default cartSlice.reducer;