import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getProfile = createAsyncThunk('user/getProfile', async ({ userId }) => {
  const response = await fetch('https://human-relief-api.herokuapp.com/api/users/profile/'+userId).then(res => res.json());
  return response;
});

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



const userSlice = createSlice({
  name: 'user',
  initialState: {
    profileData : [],
    loading: false,
    updateAcknowledged:null,
    userCurrentId:null,
    error: ""
  },
  reducers: {
  },
  extraReducers: {
    //Load Profile
    [getProfile.pending]: (state, action) => {
      state.loading = true
    },
    [getProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.profileData = action.payload;
      state.userCurrentId = action.payload[0]._id;
      console.log('%c Data','color:red');
      console.log(action.payload[0]._id);
      state.updateAcknowledged=null;
    },
    [getProfile.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },
    
    //Update Profile
    [updateProfile.pending]: (state, action) => {
      state.loading = true
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.loading = false;
      if(action.payload.acknowledged){
        state.updateAcknowledged=true;
      }
      console.log(action.payload);
    },
    [updateProfile.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },
  }
})

export default userSlice.reducer;