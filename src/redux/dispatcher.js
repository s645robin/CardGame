import {
  updateLevel,
  updateFirstSelectedCardIndex,
  updateCardsMatched,
  updateTimer
} from './action'

import { store } from './store'

export const dispatchUpdateLevel = () => store.dispatch(updateLevel()) 
export const dispatchUpdateFirstSelectedIndex = (index) => store.dispatch(updateFirstSelectedCardIndex(index))
export const dispatchUpdateCardsMatched = (matchedCardsIndexes) => store.dispatch(updateCardsMatched(matchedCardsIndexes))
export const dispatchUpdateTimer = () => store.dispatch(updateTimer())