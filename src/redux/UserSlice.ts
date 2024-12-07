import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { UserState } from '../dto/user/user-state-dto'

const initialState: UserState = {
    accessToken: "",
    role: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<UserState>) => {
            state.accessToken = action.payload.accessToken
        },
        setUser: (state, action: PayloadAction<UserState>) => {
            state.role = action.payload.role
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAccessToken, setUser } = userSlice.actions

export default userSlice.reducer