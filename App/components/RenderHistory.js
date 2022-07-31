import { View, Text } from 'react-native'
import React from 'react'

const RenderHistory = ({data, type, date, i}) => {

  const textColor = (type) => {
    switch (type) {
      case 0:
        return 'red'
      case 1:
        return 'green'
      case 2:
        return '#0945E9'
      case 3:
        return '#E9AB09'
    }
  }

  return (
    <View key={`renderHistory_${i}`} style={{flexDirection: 'row'}} >
      <Text style={{color: 'white'}}>{date} </Text>
      <Text style={{color: `${textColor(type)}`}}>{data}</Text>
    </View>
  )
}

export default RenderHistory