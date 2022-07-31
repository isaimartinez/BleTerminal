import { parse } from '@babel/core'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  devices: [],
  isScanning: true,
  isInit: false,
  history: [],
  isConnected: false,
  uuids: {}
}

const parseDate = () => {
  let now = new Date()
  return  now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ":" + now.getMilliseconds()
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
      state.isInit = action.payload
    },
    setHistory: (state, action) => {
      state.history = action.payload
    },
    addHistory: (state, action) => {
      
      state.history.push({...action.payload, date: parseDate()})
    },
    setIsConnected: (state, action) => {
      if(action.payload) {
        state.isConnected = true
        state.uuids = action.payload
        //addHistory
        state.history.push({data: "Connected", type: 1, date: parseDate()})
      } else {
        state.isConnected = false
        state.uuids = {}
        //addHistory
        state.history.push({data: "Disconnected", type: 0, date: parseDate()})
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDevices, addDevice, setIsScanning, setIsInit, setHistory, addHistory, setIsConnected } = bleSlice.actions

export default bleSlice.reducer