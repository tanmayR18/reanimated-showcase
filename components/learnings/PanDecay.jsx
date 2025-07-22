import React, { useState } from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withDecay, withSpring } from 'react-native-reanimated';


const SIZE = 120;
const BOUNDARY_OFFSET = 20;

const PanDecay = () => {
    
    const pressedValue = useSharedValue(false)
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0)

    const decayOffsetX = useSharedValue(0)
    const decayOffsetY = useSharedValue(0);
    const width = useSharedValue(0)
    const height = useSharedValue(0)
    

    const onLayout = (event) => {
    width.value = event.nativeEvent.layout.width;
    height.value = event.nativeEvent.layout.height;
  };

    const Pan = Gesture.Pan()
    .onBegin(() => {
        pressedValue.value = true
    })
    .onChange((event) => {
        offsetX.value = event.translationX;
        offsetY.value = event.translationY;
    })
    .onFinalize(() => {
        offsetX.value = withSpring(0);
        offsetY.value = withSpring(0);
        pressedValue.value = false
    })

    const decayPan = Gesture.Pan()
    .onChange((event) => {
        decayOffsetX.value += event.changeX
        decayOffsetY.value += event.changeY
    })
    .onFinalize((event) => {
        decayOffsetX.value = withDecay({
      velocity: event.velocityX,
      rubberBandEffect: true,
      clamp: [
        -(width.value / 2) + SIZE / 2 + BOUNDARY_OFFSET,
         width.value / 2 - SIZE / 2 - BOUNDARY_OFFSET,
      ],
    });

    decayOffsetY.value = withDecay({
      velocity: event.velocityY,
      rubberBandEffect: true,
      clamp: [
        -(height.value / 2) + SIZE / 2 + BOUNDARY_OFFSET,
         height.value / 2 - SIZE / 2 - BOUNDARY_OFFSET,
      ],
    });
    })

    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: pressedValue.value ? '#FFE04B' : '#B58DF1',
        transform: [
            { translateX: offsetX.value },
            { translateY: offsetY.value },
            { scale: pressedValue.value ? 1.2 : 1}]
    }))

    const decayAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: decayOffsetX.value}, {translateY: decayOffsetY.value}]
    }))

  return (
    <View  onLayout={onLayout} className=' flex-1 justify-center items-center'>

        <GestureDetector gesture={Pan}>
            <Animated.View className={"w-20 h-20 rounded-full"} style={animatedStyle}>

            </Animated.View>

            
        </GestureDetector>

    <GestureDetector gesture={decayPan}>

        <Animated.View  className={" bg-blue-600 rounded-full"} style={[{ width: SIZE, height: SIZE}, decayAnimatedStyle]}>
        </Animated.View>
    </GestureDetector>
    </View>
  );
};

export default PanDecay;

