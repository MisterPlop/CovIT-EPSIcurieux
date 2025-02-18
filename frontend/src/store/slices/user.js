import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    info : {
        isLogged: false,
        username: "Invite",
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signin: (state, action) => {
            state.info = {isLogged: true, username: action.payload.username };
        },
        signout: (state, action) => {
            state.info = {
                isLogged: false,
                username: "Invite",
            };
        }
    }
});


export const {signin, signout} = userSlice.actions

export default userSlice.reducer;