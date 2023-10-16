import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./isEditableStore"

export interface IsEditableState {
  value: boolean
}

const initialState: IsEditableState = {
  value: false,
}

export const isEditableSlice = createSlice({
  name: "isEditable",
  initialState,
  reducers: {
    toggleIsEditable: (state) => {
      state.value = !state.value
    },
    setIsEditable: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    },
  },
})

export const isEditableState = (state: RootState) => state.isEditable.value

export const { toggleIsEditable, setIsEditable } = isEditableSlice.actions

export default isEditableSlice.reducer
