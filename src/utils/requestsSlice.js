import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
    name:  "requests",
    initialState : null,
    reducers: {
        addrequests(state, action){ return action.payload},
        removeRequest(state,action){
            const newArray = state.filter((request)=> request._id !== action.payload);
            return  newArray;
        }
    }
})

export const {addrequests, removeRequest} = requestsSlice.actions;

export default requestsSlice.reducer;