import * as types from './types'

import {
  initialState
} from './state'

import {
  randomNumbers
} from '../utils'

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LEVEL:
      return {
        ...state,
        level: state.level + 1,
        numbers: randomNumbers(state.level + 1),
        currentLevelCompleted: false
      }

    case types.UPDATE_FIRST_SELECTED_CARD_INDEX:
      return {
        ...state,
        firstSelectedCardIndex: action.index
      }

    case types.UPDATE_CARDS_MATCHED:
      return {
        ...state,
        cardsMatched: [...state.cardsMatched, ...action.matchedCardsIndexes]
      }

    case types.UPDATE_TIMER:
      return {
        ...state,
        timer: state.timer + 1
      }

    case types.UPDATE_CURRENT_LEVEL_COMPLETED:
      return {
        ...state,
        firstSelectedCardIndex: initialState.firstSelectedCardIndex,
        cardsMatched: initialState.cardsMatched,
        timer: initialState.timer,
        score: state.score + (state.level * 10),
        currentLevelCompleted: true
      }

    default:
      return state
  }
}
