import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    user : null
};

let userSlice = createSlice ({
    name: "user",
    initialState,
    reducers : {
        setUser : (state, actions)=>{
            state.user = actions.payload;
        },
        clearUser : (state) =>{
            state.user = null;
        }
    }
})

export const {setUser, clearUser} = userSlice.actions;
export default userSlice.reducer;

