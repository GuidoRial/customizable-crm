import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import alertReducer, { alertState } from "./alertSlice"
export const store = configureStore({
  reducer: {
    alertState: alertReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export interface RootState {
  alertState: alertState
  value: {
    display: boolean
    type: string
    message: string
    title: string
  }
}
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
