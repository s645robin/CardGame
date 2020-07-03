import React from 'react'
import { useSelector } from 'react-redux'

import {
  StyleSheet,
  FlatList,
  View
} from 'react-native'

import { Button } from 'react-native-paper'

import CardComponent from '../components/sub_components/card_component'

import {
  dispatchUpdateFirstSelectedIndex,
  dispatchUpdateCardsMatched,
  dispatchUpdateCurrentLevelCompleted
} from '../redux/dispatcher'

import {
  genericStyles
} from '../styles'

const Cards = (props) => {
  const level = useSelector(state => state.level)
  const numbers = useSelector(state => state.numbers)
  const firstSelectedCardIndex = useSelector(state => state.firstSelectedCardIndex)
  const cardsMatched = useSelector(state => state.cardsMatched)
  const currentLevelCompleted = useSelector(state => state.currentLevelCompleted)

  React.useEffect(() => {
    if (numbers.length === cardsMatched.length) {
      // all matched, time to increase level up, and reset all state
      setTimeout(() => {
        dispatchUpdateCurrentLevelCompleted()
      }, 1000)
    }
  }, [numbers, cardsMatched])

  const _keyExtractor = React.useCallback((_, index) => {
    return index.toString()
  }, [])

  const _renderItem = React.useCallback(({ item, index }) => {
    return (
      <CardComponent
        number={item}
        index={index}
        onCardPress={onCardPress}
        firstSelectedCardIndex={firstSelectedCardIndex}
        dontFlip={cardsMatched.indexOf(index) > -1}
      />
    )
  }, [firstSelectedCardIndex, cardsMatched, onCardPress])

  const onCardPress = React.useCallback((number, index) => {
    if (firstSelectedCardIndex === undefined) {
      // no previous card selected, so update first selected card index
      dispatchUpdateFirstSelectedIndex(index)
    } else {
      // already a card selected, so now we have to match
      if (firstSelectedCardIndex !== index && numbers[firstSelectedCardIndex] === number) {
        // its a match, so update
        dispatchUpdateFirstSelectedIndex(undefined)
        dispatchUpdateCardsMatched([firstSelectedCardIndex, index])
      } else {
        // no match, reset to original state
        dispatchUpdateFirstSelectedIndex(undefined)
      }
    }
  }, [firstSelectedCardIndex])

  return (
    <>
      {
        !currentLevelCompleted
          ? <FlatList
            data={numbers}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            style={styles.container}
          />
          : <View style={genericStyles.centeredContent}>
            <Button
              onPress={props.onLevelUpPress}
              mode='outlined'
              style={styles.button}
            >
              Level Up
            </Button>
          </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})

export default React.memo(Cards)
