/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { useSelector } from 'react-redux'

import {
  View,
  StyleSheet
} from 'react-native'

import Cards from './src/containers/Cards'
import LevelComponent from './src/components/sub_components/level_component'
import TimerComponent from './src/components/sub_components/timer_component'
import ScoreComponent from './src/components/sub_components/score_component'
import ResultModalComponent from './src/components/sub_components/result_modal_component'

import {
  dispatchUpdateTimer,
  dispatchUpdateLevel
} from './src/redux/dispatcher'

const App = () => {
  const level = useSelector(state => state.level)
  const timer = useSelector(state => state.timer)
  const score = useSelector(state => state.score)
  const currentLevelCompleted = useSelector(state => state.currentLevelCompleted)

  React.useEffect(() => {
    // timer handler
    const interval = setInterval(() => {
      if (!currentLevelCompleted) {
        dispatchUpdateTimer()
      }
    }, 1000)

    return () => {
      // clearing setInterval on unmount to prevent memory leak
      clearInterval(interval)
    }
  }, [currentLevelCompleted])

  const onLevelUpPress = React.useCallback(() => {
    dispatchUpdateLevel()
  }, [])

  return (
    <>
      <View style={styles.topContainer}>
        <LevelComponent level={level} />
        <TimerComponent timer={timer} />
        <ScoreComponent score={score} />
      </View>
      <Cards onLevelUpPress={onLevelUpPress} />
      <ResultModalComponent
        level={level}
        score={score}
        visible={currentLevelCompleted}
        onLevelUpPress={onLevelUpPress}
      />
    </>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

export default App
