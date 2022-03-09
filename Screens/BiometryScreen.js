import React, { useEffect, useState } from 'react';
import TouchID from 'react-native-touch-id';
import { TouchableOpacity, Text, View, StyleSheet} from 'react-native';

export default function BiometryScreen() {
  const [biometryState, setBiometryState] = useState('Not Run')

  useEffect(() => {
    TouchID.isSupported()
    .then(biometryType => {
      console.log({ biometryType })
    })
  }, [])

  const triggerBiometryCheck = () => {
    TouchID.authenticate('to demo this react-native component')
      .then(success => {
        setBiometryState('Face ID Match Successful!!!')
      })
      .catch(error => {
        setBiometryState('Face ID Match Failed!!!')
      });
  }

  return(
    <View style={{flex: 1, marginTop: 80, marginHorizontal: 20}}>
      <TouchableOpacity onPress={() => {
        triggerBiometryCheck();
      }}>
        <Text style={styles.text}>Biometry check</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{biometryState}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: 'blue', 
    marginBottom: 8, 
    fontSize: 20
  }
})