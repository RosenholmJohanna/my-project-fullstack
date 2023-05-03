import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name: "user",
    initialState:{
        error: null,
        username: null,
        userId: null,
        accessToken: null,
    },

    reducers: {
        setUsername: (store, action) => {
            store.username = action.payload;
        },
        setError: (store, action) => {
            store.error = action.payload;
        },
        setId: (store, action) => {
            store.id = action.payload;
        },
        setAccessToken: (store, action) => {
            store.accessToken = action.payload;
        },
        setSavedQuestion: (store, action) => {
            store.savedQuestion = action.payload
        }  
    }, 
});
 


export default user;

