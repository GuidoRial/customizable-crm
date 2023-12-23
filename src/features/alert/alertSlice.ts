import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "./alertStore"
import { wait } from "../../utils"

export interface alertState {
  type: "success" | "warning" | "error" | "neutral" | ""
  message: string
  title: string
  display: boolean
}

const initialState: alertState = {
  display: true,
  type: "neutral",
  title: "",
  message: "",
}

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    hideAlert: (state) => {
      if (state.display === false) return
      state.display = false
    },
    setAlert: (state, action: PayloadAction<alertState>) => {
      console.log("runs")

      state = action.payload
      if (state.display === true) {
        wait(5000).then(() => {
          state.display = false
        })
      }
    },
  },
})

export const selectAlert = (state: RootState) => state.alertState
export const { hideAlert, setAlert } = alertSlice.actions

export default alertSlice.reducer
