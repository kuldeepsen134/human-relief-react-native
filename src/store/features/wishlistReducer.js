import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getwishlist = createAsyncThunk('wishlist/getwishlist', async (userId) => {
  console.log(userId)
  const response = await fetch('https://human-relief-api.herokuapp.com/api/getWishlist/'+userId).then(res => res.json());
  return response;
}); 

export const deleteWishlist = createAsyncThunk('wishlist/deleteWishlist', async ({ wishlistId }) => {
  const response = await fetch('https://human-relief-api.herokuapp.com/api/deleteWishlist/'+wishlistId,{
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
  return response;
});  

export const addWishlist = createAsyncThunk('wishlist/addWishlist', async ({ postId,userId }) => {
  const response = await fetch('https://human-relief-api.herokuapp.com/api/addWishlist',{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({ 
      "postId":postId,
      "userId":userId
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

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlistData : [],
    wishlistloading: false,
    error: ""
  },
  reducers: {
  },
  extraReducers: {
    //Load Profile
    [addWishlist.pending]: (state, action) => {
      state.wishlistloading = true
    },
    [addWishlist.fulfilled]: (state, action) => {
      state.wishlistloading = false;
    },
    [addWishlist.rejected]: (state, action) => {
      state.wishlistloading = false
      state.error = action.error
    },
    
    [getwishlist.pending]: (state, action) => {
      state.wishlistloading = true
    },
    [getwishlist.fulfilled]: (state, action) => {
      state.wishlistloading = false;
      state.wishlistData = action.payload;
    },
    [getwishlist.rejected]: (state, action) => {
      state.wishlistloading = false
      state.error = action.error
    },
  }
})

export default wishlistSlice.reducer;