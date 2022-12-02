import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InitialState } from "@react-navigation/native";

export const signinUser = createAsyncThunk('auth/signinUser', async ({ email, password }) => {
  const response = await fetch('https://human-relief-api.herokuapp.com/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(res => res.json());
  return response;
});


export const uniqueUser = createAsyncThunk('auth/uniqueUser', async (email) => {
  const response = await fetch('https://human-relief-api.herokuapp.com/api/users/unique/' + email).then(res => res.json());
  return response;
});


export const signUpUser = createAsyncThunk('auth/signUpUser', async ({ firstName, lastName, email, password }) => {
  console.log("API Hit 3");
  const response = await fetch('https://human-relief-api.herokuapp.com/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
    })
  }).then(res => res.json());
  return response;
});


export const isLogin = createAsyncThunk('auth/isLogin', async () => {
  const token = await AsyncStorage.getItem('token');
  //const userId =  await AsyncStorage.getItem('userId');
  return JSON.parse(token);
});

export const userLogout = createAsyncThunk('auth/userLogout', async () => {
  const token = await AsyncStorage.removeItem('token');
  //const userId =  await AsyncStorage.removeItem('userId');
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData:[],
    token: null,
    userId: null,
    loading: false,
    isUniqueUser: null,
    error: ""
  },

  reducers: {
  },
  extraReducers: {
    [signinUser.pending]: (state, action) => {
      state.loading = true
    },
    [signinUser.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload.token) {
        state.token = action.payload.token;
        state.userId = action.payload.data._id;
        const loginToken = JSON.stringify({
          token: action.payload.token,
          userId: action.payload.data._id
        })

        AsyncStorage.setItem('token', loginToken);
        //AsyncStorage.setItem('userID',action.payload.data._id)
      } else {
        alert(action.payload.Message);
      }
    },
    [signinUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },

    [isLogin.fulfilled]: (state, action) => {
      //console.log(action.payload.userId); 
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },

    [userLogout.fulfilled]: (state, action) => {
      state.token = null;
      state.userId = null;
    },

    //Unique User
    [uniqueUser.pending]: (state, action) => {
      state.loading = true
    },
    [uniqueUser.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload)
      state.isUniqueUser = action.payload.status;
    },
    [uniqueUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
    },

    //Sign Up User
    [signUpUser.pending]: (state, action) => {
      state.loading = true
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.userId = action.payload.data._id;
      const loginToken = JSON.stringify({
        token: action.payload.token,
        userId: action.payload.data._id
      })
      AsyncStorage.setItem('token', loginToken);
      state.isUniqueUser=null;

      console.log(action.payload)

    },
    [signUpUser.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error;
      alert(action.error)
    },
  }
})

export default authSlice.reducer;