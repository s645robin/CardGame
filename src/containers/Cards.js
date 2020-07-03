import React from 'react'
import { useSelector } from 'react-redux'

import {
  StyleSheet,
  FlatList
} from 'react-native'

import CardComponent from '../components/sub_components/card_component'

import {
  dispatchUpdateFirstSelectedIndex,
  dispatchUpdateCardsMatched,
  dispatchUpdateLevel
} from '../redux/dispatcher'

const Cards = (props) => {
  const level = useSelector(state => state.level)
  const numbers = useSelector(state => state.numbers)
  const firstSelectedCardIndex = useSelector(state => state.firstSelectedCardIndex)
  const cardsMatched = useSelector(state => state.cardsMatched)

  React.useEffect(() => {
    if (numbers.length === cardsMatched.length) {
      // all matched, time to increase level up, and reset all state
      dispatchUpdateLevel()
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

  const onCardPress = (number, index) => {
    if (firstSelectedCardIndex === undefined) {
      // no previous card selected, so update first selected card index
      dispatchUpdateFirstSelectedIndex(index)
    } else {
      // already a card selected, so now we have to match
      if (numbers[firstSelectedCardIndex] === number) {
        // its a match, so update
        dispatchUpdateFirstSelectedIndex(undefined)
        dispatchUpdateCardsMatched([firstSelectedCardIndex, index])
      } else {
        // no match, reset to original state
        dispatchUpdateFirstSelectedIndex(undefined)
      }
    }
  }

  return (
    <FlatList
      data={numbers}
      keyExtractor={_keyExtractor}
      renderItem={_renderItem}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Cards
