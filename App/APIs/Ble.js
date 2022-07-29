import { NativeModules, NativeEventEmitter, PermissionsAndroid } from 'react-native';
import BleManager from 'react-native-ble-manager'
import {store} from '../redux/store'
import {setIsInit, setIsScanning, setDevices, addDevice} from '../redux/bleSlice';

const BleManagerModule = NativeModules.BleManager
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule)


export const initBle = () => {
  BleManager.start({ showAlert: false })

  bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
  bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan );
  bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
  bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );

  if (Platform.OS === 'android' && Platform.Version >= 23) {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
        if (result) {
          console.log("Permission is OK");
        } else {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
            if (result) {
              console.log("User accept");
            } else {
              console.log("User refuse");
            }
          });
        }
    });
  }  
  store.dispatch(setIsInit(true))
  console.log("Ble initialized")
}

export const unmountBle = () => {
  console.log('unmount');
  // bleManagerEmitter.removeListener('BleManagerDiscoverPeripheral', handleDiscoverPeripheral);
  // bleManagerEmitter.removeListener('BleManagerStopScan', handleStopScan );
  // bleManagerEmitter.removeListener('BleManagerDisconnectPeripheral', handleDisconnectedPeripheral );
  // bleManagerEmitter.removeListener('BleManagerDidUpdateValueForCharacteristic', handleUpdateValueForCharacteristic );
}


const handleDiscoverPeripheral = (peripheral) => {
  if (peripheral.name) {
    //add device to list
  console.log('Got ble peripheral', peripheral);
  store.dispatch(addDevice(peripheral))

  }
  // peripherals.set(peripheral.id, peripheral);
  // setList(Array.from(peripherals.values()));
}

const handleStopScan = () => {
  console.log('Scan is stopped');
  store.dispatch(setIsScanning(false))
}

const handleDisconnectedPeripheral = (data) => {
  // let peripheral = peripherals.get(data.peripheral);
  // if (peripheral) {
  //   peripheral.connected = false;
  //   peripherals.set(peripheral.id, peripheral);
  //   setList(Array.from(peripherals.values()));
  // }
  console.log('Disconnected from ' + data.peripheral);
}

const handleUpdateValueForCharacteristic = (data) => {
  console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
}



export const scan = () => {
  BleManager.scan([], 3, false).then(() => {
    store.dispatch(setDevices([]))
    store.dispatch(setIsScanning(true))
    console.log('Scanning...');
  }).catch(err => {
    console.error(err);
  });
}