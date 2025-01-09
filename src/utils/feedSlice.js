import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const feedSlice = createSlice({
    name : "feed",
    initialState,
    reducers:{
        addFeed(state, action) {
            return action.payload;
        },
        removeUserFromFeed(state, action){
            const newArray = state.filter((user)=> user._id !== action.payload)
            return newArray;
        }
    }
})

export const {addFeed, removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer