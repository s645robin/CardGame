import React from 'react'

import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import { BottomModal } from 'react-native-modals'

import {
  withTheme,
  Button
} from 'react-native-paper'

const ResultModalComponent = (props) => {
  const [visible, setVisible] = React.useState(false)

  const {
    level,
    score,
    onLevelUpPress,
    theme: {
      colors: {
        primary
      }
    }
  } = props

  React.useEffect(() => {
    setVisible(props.visible)
  }, [props.visible])

  const onHardwareBackPress = () => {
    setVisible(false)
    return true
  }

  return (
    <BottomModal
      visible={visible}
      onHardwareBackPress={onHardwareBackPress}
      onSwipeOut={onHardwareBackPress}
      onTouchOutside={onHardwareBackPress}
      swipeDirection='down'
      rounded
      height={0.7}
      useNativeDriver
    >
      <View style={styles.container}>
        <Text style={[styles.congrats, styles.bold, { color: primary }]}>Congraluations!</Text>
        <Text style={[styles.level]}>Level {level} Finished</Text>
        <Text style={[styles.score, styles.bold]}>Score: {score}</Text>
        <Button
          onPress={onLevelUpPress}
          mode='outlined'
        >
          Level Up
        </Button>
      </View>
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  congrats: {
    fontSize: 24,
    marginBottom: 16
  },
  level: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 16
  },
  score: {
    fontSize: 24,
    marginBottom: 32
  },
  bold: {
    fontWeight: 'bold'
  }
})

export default withTheme(ResultModalComponent)
