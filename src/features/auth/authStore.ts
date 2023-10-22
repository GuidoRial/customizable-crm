import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer, { authState } from "./authSlice"
export const store = configureStore({
  reducer: {
    authState: authReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export interface RootState {
  authState: authState
  value: {
    loading: false,
    user: {
      _id: string
      email: string
    }
    session: string
  }
}
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
