"use client"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  login_name: string
  mobile: string
  email: string
  login_type_id: string
  jwt: string | null
}

const initialState: AuthState = {
  login_name: "",
  mobile: "",
  email: "",
  login_type_id: "",
  jwt: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Omit<AuthState, "jwt">>) => {
      state.login_name = action.payload.login_name
      state.mobile = action.payload.mobile
      state.email = action.payload.email
      state.login_type_id = action.payload.login_type_id
    },
    setJwt: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload
    },
    clearAuth: (state) => {
      state.login_name = ""
      state.mobile = ""
      state.email = ""
      state.login_type_id = ""
      state.jwt = null
    },
  },
})

export const { setUserData, setJwt, clearAuth } = authSlice.actions

export default authSlice.reducer
