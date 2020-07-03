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

  const {
    number,
    index,
    onCardPress,
    firstSelectedCardIndex,
    cardsMatched,
    theme: {
      colors: {
        primary
      }
    }
  } = props

  // set listener to animatedValue to update rotation degree, clear listener on unmount
  React.useEffect(() => {
    const _animatedListener = animatedValue.addListener(({ value }) => {
      setValue(value)
    })

    return () => {
      // clearing setInterval on unmount to prevent memory leak
      animatedValue.removeListener(_animatedListener)
    }
  }, [])

  // show already matched card and first selected card
  React.useEffect(() => {
    if (((props.firstSelectedCardIndex === index) || (props.cardsMatched.indexOf(index) > -1)) && (!isFliped)) {
      flipCard()
    }
  }, [props.firstSelectedCardIndex, props.cardsMatched])

  React.useEffect(() => {
    const dontFlip = props.cardsMatched.indexOf(props.index) > -1
    if (
      (props.firstSelectedCardIndex === props.index && (!isFliped)) ||
      ((props.firstSelectedCardIndex === undefined) && (isFliped && (!dontFlip)))
    ) {
      flipCard()
    }
  }, [props.firstSelectedCardIndex, props.cardsMatched, isFliped])

  const _onCardPress = React.useCallback(() => {
    const dontFlip = cardsMatched.indexOf(props.index) > -1
    if ((!dontFlip) && (!isFliped)) {
      flipCard()
      onCardPress(number, index)
    }
  }, [cardsMatched, isFliped, onCardPress])

  // create show card callback only on component mount to prevent recreate on every render
  const showCard = React.useCallback(() => {
    setIsFlipped(true)
  }, [])

  // create show card callback only on component mount to prevent recreate on every render
  const hideCard = React.useCallback(() => {
    setIsFlipped(false)
  }, [])

  const flipCard = () => {
    if (value >= 90) {
      Animated.spring(animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start(hideCard) // callback to fire after animation finish
    } else {
      Animated.spring(animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start(showCard) // callback to fire after animation finish
    }
  }

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

// dont update component if none of the below props change
const arePropsEqual = (prevProps, nextProps) => {
  const isEqual = (
    prevProps.onCardPress === nextProps.onCardPress &&
    prevProps.firstSelectedCardIndex === nextProps.firstSelectedCardIndex &&
    prevProps.cardsMatched === nextProps.cardsMatched
  )

  return isEqual
}

export default React.memo(withTheme(CardComponent), arePropsEqual)
