import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./authStore"
import auth from "../../services/auth"
import { ILoginUserDTO, ISignUpUserDTO } from "../../interfaces/IAuth"

export interface authState {
  loading: boolean
  user: {
    _id: string
    email: string
  }
  session: string
}

const initialState: authState = {
  loading: false,
  user: {
    _id: "",
    email: "",
  },
  session: "",
}

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (loginData: ILoginUserDTO, { dispatch }) => {
    // Set loading to true when the request starts.
    dispatch(authSlice.actions.setLoading(true))

    try {
      const { user, session } = await auth.signIn(loginData)
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("session", session)
      return { user, session }
    } catch (error) {
      // Handle errors here
      throw error
    } finally {
      // Set loading back to false when the request is done.
      dispatch(authSlice.actions.setLoading(false))
    }
  },
)

export const signUpAsync = createAsyncThunk(
  "auth/signup",
  async (signUpData: ISignUpUserDTO, { dispatch }) => {
    // Set loading to true when the request starts.
    dispatch(authSlice.actions.setLoading(true))

    try {
      const { user, session } = await auth.signUp(signUpData)
      localStorage.setItem("user", JSON.stringify(user))
      localStorage.setItem("session", session)
      return { user, session }
    } catch (error) {
      // Handle errors here
      throw error
    } finally {
      // Set loading back to false when the request is done.
      dispatch(authSlice.actions.setLoading(false))
    }
  },
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("session")
      localStorage.removeItem("user")
      state.session = ""
      state.user = {
        _id: "",
        email: "",
      }
    },
    setLoading(state, action) {
      state.loading = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.session = action.payload.session
    })
    builder.addCase(signUpAsync.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.session = action.payload.session
    })
  },
})

export const selectAuth = (state: RootState) => state.authState

export default authSlice.reducer
