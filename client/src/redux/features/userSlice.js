import { createSlice } from "@reduxjs/toolkit";
export const userSlice=createSlice({
    name:"user",
    initialState:{
        user:null,
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
    },
    updateNotifications: (state, action) => {
        if (state.user) {
          state.user.seennotification = [
            ...state.user.seennotification,
            ...state.user.notification,
          ];
          state.user.notification = [];
        }
      },
}
})

export const {setUser,updateNotifications}=userSlice.actions
export default userSlice.reducer