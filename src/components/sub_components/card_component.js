import React from 'react'

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated
} from 'react-native'

import { withTheme } from 'react-native-paper'

const CardComponent = (props) => {
  const [animatedValue] = React.useState(new Animated.Value(0))
  const [value, setValue] = React.useState(0)
  const [isFliped, setIsFlipped] = React.useState(false)

  React.useEffect(() => {
    animatedValue.addListener(({ value }) => {
      setValue(value)
    })
  }, [])

  React.useEffect(() => {
    if (props.firstSelectedCardIndex === index && (!isFliped)) {
      flipCard()
    }
  }, [props.firstSelectedCardIndex])

  React.useEffect(() => {
    if (
      (props.firstSelectedCardIndex === props.index && (!isFliped)) ||
      ((props.firstSelectedCardIndex === undefined) && (isFliped && (!props.dontFlip)))
    ) {
      flipCard()
    }
  }, [props.firstSelectedCardIndex, props.dontFlip, isFliped])

  const {
    number,
    index,
    onCardPress,
    firstSelectedCardIndex,
    dontFlip,
    theme: {
      colors: {
        primary
      }
    }
  } = props

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  })

  const backInterpolate = animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })

  const frontOpacity = animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })

  const backOpacity = animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })

  const _onCardPress = () => {
    if ((!dontFlip) && (!isFliped)) {
      flipCard()
      props.onCardPress(number, index)
    }
  }

  const frontAnimatedStyle = {
      transform: [
        { rotateY: frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: backInterpolate }
      ]
    }

  const flipCard = () => {
    if (value >= 90) {
      Animated.spring(animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start()
    } else {
      Animated.spring(animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start()
    }

    setIsFlipped(!isFliped)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={_onCardPress}>
        <Animated.View
          useNativeDriver
          style={[
            styles.card,
            frontAnimatedStyle,
            { opacity: frontOpacity },
            { backgroundColor: primary }
          ]}
        />
        <Animated.View
          useNativeDriver
          style={[
            styles.card,
            styles.backSide,
            backAnimatedStyle,
            { opacity: backOpacity }
          ]}
        >
          <Text style={styles.text}>{number}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: 100,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin:16,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden'
  },
  backSide: {
    top: 0,
    position: 'absolute'
  },
  text: {
    fontSize: 36,
    color: '#000'
  }
})

const arePropsEqual = (prevProps, nextProps) => {
  const isEqual = (
    prevProps.onCardPress === nextProps.onCardPress &&
    prevProps.firstSelectedCardIndex === nextProps.firstSelectedCardIndex &&
    prevProps.dontFlip === nextProps.dontFlip
  )

  return isEqual
}

export default React.memo(withTheme(CardComponent), arePropsEqual)
