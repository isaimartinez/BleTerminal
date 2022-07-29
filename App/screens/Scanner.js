import React,{useEffect} from 'react'
import { SafeAreaView, View, TouchableOpacity, Text, ScrollView, RefreshControl } from 'react-native'
import { initBle, unmountBle, scan } from '../APIs/Ble'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const Scanner = ({navigation}) => {
  const {isInit, devices, isScanning} = useSelector((state) => state.ble)
  const dispatch = useDispatch()
  // const navigation = useNavigation()

  useEffect(() => {
    console.log("isInit", isInit)
    if(!isInit) {
      initBle();
    } else {
      startScan()
    }

    return () => {
    }
  }, [isInit])

  useEffect(() => {
    return () => {
      console.log("Desmonando")
      unmountBle()
    }
  }, [])
  

  const startScan = () => {
    scan()
  }

  const rssiColor = (v) => {
    let val = Number(v)*-1
    console.log("val", val)

    if(val < 50){
      return 'rgb(74, 222, 128)' // green-400
    } else if (val > 50 && val < 60){
      return 'rgb(163, 230, 53)' // lime-400 
    } else if (val > 60 && val < 70) {
      return 'rgb(250, 204, 21)' // yellow-400
    } else if (val > 70){
      return 'rgb(248, 113, 113)' // red-400
    }
  }

  return (
    <SafeAreaView style={{flex: 1,}}>
      <ScrollView contentContainerStyle={{flex: 1, margin: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={isScanning}
            onRefresh={() => startScan()}
          />
        }
      >
        {!isScanning && !devices.length && (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20}}>No device detected</Text>
          </View>
        )}
        {
          !isScanning && devices.length > 0 && (
            devices.map((device,i) => (
              <TouchableOpacity key={i} style={{backgroundColor: 'white', padding: 20, borderRadius: 5, marginVertical: 5}}
                onPress={() => navigation.navigate('Terminal')}
              >
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 19}}>{device.name}</Text>
                  <Text style={{fontSize: 19, color: `${rssiColor(device.rssi)}` }}>rssi: {device.rssi}</Text>
                </View>
              </TouchableOpacity>
            ))
          )
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default Scanner