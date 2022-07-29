import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  devices: [],
  isScanning: false,
  isInit: false
}

export const bleSlice = createSlice({
  name: 'ble',
  initialState,
  reducers: {
    setDevices: (state, action) => {
      state.devices = action.payload
    },
    addDevice: (state, action) => {
      state.devices.push(action.payload)
    },
    setIsScanning: (state, action) => {
      state.isScanning = action.payload
    },
    setIsInit: (state, action) => {
      console.log("setIsInit")
      state.isInit = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDevices, addDevice, setIsScanning, setIsInit } = bleSlice.actions

export default bleSlice.reducer