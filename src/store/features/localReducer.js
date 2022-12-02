import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Language } from "../../componant/localization/Language";

export const getLocal = createAsyncThunk('local/getLocal', async () => {
  const lang = await AsyncStorage.getItem('local');
  return lang;
});

export const setLocal = createAsyncThunk('local/setLocal', async (local) => {
  //console.log(local)
  const lang = await AsyncStorage.setItem('local',local);
  return local;
});

const getLanguageSign = (languageID) =>{
  let temp = Language.filter((item)=> item.id === languageID)
  return temp[0].language;
}

const localSlice = createSlice({
  name: 'local',
  initialState: {
    local: null,
    languageSign:null,
    localLoading: false,
    error: ""
  },
  extraReducers: {
    [getLocal.pending]: (state, action) => {
      state.localLoading = true
    },
    [getLocal.fulfilled]: (state, action) => {
      state.localLoading = false;
      if(action.payload){
        state.local = action.payload;
        state.languageSign = getLanguageSign(action.payload);
      }else{
        state.local = 'en';
        state.languageSign='E'
      }
    },
    [getLocal.rejected]: (state, action) => {
      state.localLoading = false
      state.error = action.error
    },


    [setLocal.pending]: (state, action) => {
      state.localLoading = true
    },
    [setLocal.fulfilled]: (state, action) => {
      state.localLoading = false;
      state.local = action.payload;
      state.languageSign = getLanguageSign(action.payload);
    },
    [setLocal.rejected]: (state, action) => {
      state.localLoading = false
      state.error = action.error;
    },
  },
})

export default localSlice.reducer;