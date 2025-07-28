import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const banana = require('../../assests/images/fruits/banana.jpeg');
const tomato = require('../../assests/images/fruits/tomato.jpeg');

const Practise = () => {
  const translateX = useSharedValue(8);
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const [on, setOn] = useState(false);
  const SWITCH_WIDTH = 144;
  const THUMB_WIDTH = 40 + 20;

  const toggleImage = () => {
    if (on) {
      translateX.value = withTiming(4);
      setOn(false);
    } else {
      translateX.value = withTiming(SWITCH_WIDTH - THUMB_WIDTH);
      setOn(true);
    }
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      translateX.value,
      [4, SWITCH_WIDTH - THUMB_WIDTH],
      ['#F44336', '#4CAF50'],
    ),
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      {
        rotate: `${interpolate(
          translateX.value,
          [4, SWITCH_WIDTH - THUMB_WIDTH],
          [0, 360],
        )}deg`,
      },
    ],
  }));

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Switch</Text>

      <AnimatedPressable
        style={animatedContainerStyle}
        onPress={toggleImage}
        className="h-14 w-36 justify-center mt-5 overflow-hidden rounded-full border"
      >
        <Animated.View
          style={animatedStyle}
          className="h-10 w-10 overflow-hidden rounded-full"
        >
          <Image source={on ? banana : tomato} className="h-full w-full" />
        </Animated.View>
      </AnimatedPressable>
    </View>
  );
};

export default Practise;

const styles = StyleSheet.create({});
