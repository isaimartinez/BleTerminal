import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView,View, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, Keyboard, Text } from 'react-native'
import { connectAndPrepare, disconnect, write } from '../APIs/Ble'
import { useSelector, useDispatch } from 'react-redux'
import { setHistory } from '../redux/bleSlice'
import Icon from 'react-native-vector-icons/MaterialIcons';
import RenderHistory from '../components/RenderHistory';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper'

const Terminal = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const {uuids, history} = useSelector((state) => state.ble)
  const {device} = route.params
  const [text, setText] = useState("")
  const scrollViewRef = useRef();


  useEffect(() => {
    dispatch(setHistory([]))
    connect()
    return () => {
      disconnect(device.id)
      dispatch(setHistory([]))
    }
  }, [])

  useEffect(() => {
    scrollViewRef.current.scrollToEnd({animated: true})
  }, [history])
  
  
  const connect = () => {
    connectAndPrepare(device.id)
  }

  const handleWrite = () => {
    if(text){
      write(device.id, uuids.service, uuids.characteristic, text)
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingWrapper>
        <View style={{flex: 1}}>
          <View style={{flex: 9, backgroundColor: 'black'}}>
            <ScrollView contentContainerStyle={{flexGrow: 1, padding: 5 }}
              ref={scrollViewRef}
            >
              {
                history.map((h,i) => (
                  <RenderHistory {...h} i={i} key={`renderHistory_${i}`}/>
                ))
              }
              <Text>  </Text>
            </ScrollView>
          </View>


          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',}}>
            <View style={{flex: 8, justifyContent: 'center', alignItems: 'center'}}>
              <TextInput
                style={{ height: 45, width: '90%', borderColor: 'gray', borderWidth: 1, borderRadius: 3}}
                onChangeText={setText}
                autoCorrect={false}
                value={text}
                onSubmitEditing={() => {text && handleWrite()}}
                placeholder="useless placeholder"
              />
            </View>

            <TouchableOpacity style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}
              onPress={() => {handleWrite();Keyboard.dismiss()}}
            >
              <Icon name="send" size={30} color="#000000" />
            </TouchableOpacity>
          </View>

        </View>

      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  )
}

export default Terminal