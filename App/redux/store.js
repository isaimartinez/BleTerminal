import { configureStore } from '@reduxjs/toolkit'
import bleReducer from './bleSlice'

export const store = configureStore({
  reducer:{
    ble: bleReducer,
  }
})