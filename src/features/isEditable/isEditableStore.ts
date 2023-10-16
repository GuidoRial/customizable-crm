import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import isEditableReducer, { IsEditableState } from './isEditableSlice'
export const store = configureStore({
  reducer: {
    isEditable: isEditableReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export interface RootState {
  isEditable: IsEditableState,
  value: boolean
}
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
