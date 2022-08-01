import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connectAndPrepare, disconnect } from '../APIs/Ble';

const BleSwitchBtn = ({route}) => {
  const {isConnected} = useSelector((state) => state.ble)

  const {id} = route.params.device

  const handleBtn = () => {
    !isConnected ? connectAndPrepare(id) : disconnect(id)
  }

  return (
    <TouchableOpacity
      onPress={() => handleBtn()}
    >
      <Icon 
        name={!isConnected ? 'bluetooth' : 'bluetooth-connected'} 
        size={30} 
        color={!isConnected ? '#000000' : 'blue'} />
    </TouchableOpacity>
  )
}

export default BleSwitchBtn