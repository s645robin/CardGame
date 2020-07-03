import React from 'react'

import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import { Surface } from 'react-native-paper'

const LevelComponent = (props) => {
  const {
    level
  } = props

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Level {level}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    color: '#000'
  }
})

export default LevelComponent
