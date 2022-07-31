import React,{useEffect} from 'react'
import { SafeAreaView, View, TouchableOpacity, Text, ScrollView, RefreshControl } from 'react-native'
import { initBle, unmountBle, scan } from '../APIs/Ble'
import { useSelector, useDispatch } from 'react-redux'
import RenderDevice from '../components/RenderDevice';

const Scanner = ({navigation}) => {
  const {isInit, devices, isScanning} = useSelector((state) => state.ble)
  const dispatch = useDispatch()

  useEffect(() => {
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
      unmountBle()
    }
  }, [])
  

  const startScan = () => {
    scan()
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
        {!devices.length && (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 20}}>No device detected</Text>
          </View>
        )}
        {
          devices.length > 0 && (
            devices.map((device,i) => (
              <RenderDevice device={device} i={i} key={`renderHistory_${i}`} />
            ))
          )
        }

      </ScrollView>
    </SafeAreaView>
  )
}

export default Scanner