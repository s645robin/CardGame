import {
  randomNumbers
} from '../utils'

export const initialState = {
  timer: 0,
  level: 0,
  score: 0,
  numbers: randomNumbers(0),
  firstSelectedCardIndex: undefined,
  cardsMatched: [],
  currentLevelCompleted: false
}
