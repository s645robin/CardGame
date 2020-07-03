import * as types from './types'

export const updateLevel = () => ({
  type: types.UPDATE_LEVEL
})

export const updateFirstSelectedCardIndex = (index) => ({
  type: types.UPDATE_FIRST_SELECTED_CARD_INDEX,
  index
})

export const updateCardsMatched = (matchedCardsIndexes) => ({
  type: types.UPDATE_CARDS_MATCHED,
  matchedCardsIndexes
})

export const updateTimer = () => ({
  type: types.UPDATE_TIMER
})