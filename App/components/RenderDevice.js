import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'

const RenderDevice = ({device, i}) => {
  const navigation = useNavigation()

  const rssiColor = (v) => {
    let val = Number(v)*-1
    if(val <= 50){
      return 'rgb(74, 222, 128)' // green-400
    } else if (val > 50 && val <= 60){
      return 'rgb(163, 230, 53)' // lime-400 
    } else if (val > 60 && val <= 70) {
      return 'rgb(250, 204, 21)' // yellow-400
    } else if (val > 70){
      return 'rgb(248, 113, 113)' // red-400
    }
  }

  return (
    <TouchableOpacity key={`${device.id}_${i}`} style={{backgroundColor: 'white', padding: 20, borderRadius: 5, marginVertical: 5}}
      onPress={() => navigation.navigate('Terminal', {device})}
    >
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{fontSize: 19}}>{device.name}</Text>
        <Icon name="bluetooth-searching" size={30} color={rssiColor(device.rssi)} />
      </View>
    </TouchableOpacity>
  )
}

export default RenderDevice