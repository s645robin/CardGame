import React from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import { Surface } from 'react-native-paper'

const CardComponent = (props) => {
  const {
    number,
    index,
    onCardPress,
    firstSelectedCardIndex,
    dontFlip
  } = props

  const _onCardPress = () => {
    if (!dontFlip) {
      props.onCardPress(number, index)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={_onCardPress}>
        <Surface style={[styles.box, firstSelectedCardIndex === index ? styles.selectedBackground : null, dontFlip ? styles.dontFlip : null]}>
          <Text style={styles.text}>{number}</Text>
        </Surface>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    width: 100,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 36,
    color: '#000'
  },
  selectedBackground: {
    backgroundColor: '#ff0'
  },
  dontFlip: {
    backgroundColor: '#f0f'
  }
})

export default CardComponent
