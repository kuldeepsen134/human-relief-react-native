import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCategory = createAsyncThunk('donation/getCategory', async () => {
  const response = await fetch('https://human-relief-api.herokuapp.com/api/getCategory').then(res => res.json());
  return response;
});


export const getDonation = createAsyncThunk('donation/getDonation', async () => {
  const response = await fetch('https://human-relief-api.herokuapp.com/api/getDonation').then(res => res.json());
  return response;
});

export const getDonationFilterByCategory = createAsyncThunk('donation/getDonationFilterByCategory', async (title) => {
  console.log(title);
  const response = await fetch('https://human-relief-api.herokuapp.com/api/donationSearchByCategory/'+title).then(res => res.json());
  return response;
});

export const getSingleDonation = createAsyncThunk('donation/getSingleDonation', async (id) => {
  const response = await fetch('https://human-relief-api.herokuapp.com/api/getSingleDonation/'+id).then(res => res.json());
  return response;
});



/*
export const getCategory = createAsyncThunk('user/getCategory', async ({ userId }) => {
  const response = await fetch('https://human-relief-api.herokuapp.com/api/users/profile/'+userId).then(res => res.json());
  return response;
});
export const donateReducer = createAsyncThunk('user/getProfile', async ({ userId }) => {
  const response = await fetch('https://human-relief-api.herokuapp.com/api/users/profile/'+userId).then(res => res.json());
  return response;
});
*/




const donateSlice = createSlice({
  name: 'donation',
  initialState: {
    category : [],
    donation : [],
    filterDonation:[],
    singleDonation:[],
    loading: false,
    loadingFilter:false,
    updateAcknowledged:null,
    error: ""
  },
  reducers: {
  },
  extraReducers: {
    //Load Category
    [getCategory.pending]: (state, action) => {
      state.loading = true
    },
    [getCategory.fulfilled]: (state, action) => {
      state.loading = false;
      state.category = action.payload;
    },
    [getCategory.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error;
      alert(action.error);
    },
    
    //Load Donation
    [getDonation.pending]: (state, action) => {
      state.loading = true
    },
    [getDonation.fulfilled]: (state, action) => {
      state.loading = false;
      state.donation = action.payload;
    },
    [getDonation.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },

    //Load Donation By Category
    [getDonationFilterByCategory.pending]: (state, action) => {
      state.loadingFilter = true
    },
    [getDonationFilterByCategory.fulfilled]: (state, action) => {
      state.loadingFilter = false;
      state.filterDonation = action.payload; 
    },
    [getDonationFilterByCategory.rejected]: (state, action) => {
      state.loadingFilter = false
      state.error = action.error;
    },
   
    //Load Single Donation 
    [getSingleDonation.pending]: (state, action) => {
      state.loading = true
    },
    [getSingleDonation.fulfilled]: (state, action) => {
      state.loading = false;
      state.singleDonation = action.payload; 
    },
    [getSingleDonation.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error;
    },
    
  }
}) 

export default donateSlice.reducer;