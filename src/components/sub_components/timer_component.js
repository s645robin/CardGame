import React from 'react'

import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import { Surface } from 'react-native-paper'

import {
  secondsTohhmmss
} from '../../utils'

const TimerComponent = (props) => {
  const {
    timer
  } = props

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{secondsTohhmmss(timer)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 16
  }
})

export default TimerComponent
