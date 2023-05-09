import { createSlice } from "@reduxjs/toolkit";


export const getInitialState = () => {
    const state = JSON.parse(localStorage.getItem("userReduxState") ?? "null");
    return {
      error: null,
      username: null,
      id: null,
      accessToken: null,
      savedQuestion: null,
      ...state,
    };
  };

  console.log(localStorage)
  
  export const user = createSlice({
    name: "user",
    initialState: getInitialState(),
    
    reducers: {
      setUsername: (state, { payload }) => ({ 
        ...state, username: payload }),

      setError: (state, { payload }) => ({
         ...state, error: payload }),

      setId: (state, { payload }) => ({ 
        ...state, id: payload }),

      setAccessToken: (state, { payload }) => ({ 
        ...state, accessToken: payload }),

      setSavedQuestion: (state, { payload }) => ({ 
        ...state, savedQuestion: payload }),
    },
  });
  

  export default user;



