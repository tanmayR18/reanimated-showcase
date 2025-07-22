import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const Practise = () => {
    
    const animatedValue = useSharedValue(1)
    const [clicked, setClicked] = useState(false)

    console.log('rendered')

    const animatedStyle = useAnimatedStyle(() => {

        const width = interpolate(animatedValue.value, [0, 1], [100, 200])
        const borderRadius = interpolate(animatedValue.value, [0, 1], [0, 100])
        const bgColor = interpolateColor( animatedValue.value, [0, 1], ['blue', 'orange'])
        const rotate = interpolate(animatedValue.value, [0,1], [0, 90])
        return {
            width,
            height: width,
            borderRadius,
            backgroundColor: bgColor,
            transform: [{ rotate: `${rotate}deg`}]
        }

    })

  return (
    <View className=' flex-1 justify-center items-center'>

        <Animated.View style={[animatedStyle]}>

        </Animated.View>
        
        <Pressable className=' p-5 border mt-8' onPress={() => {
            console.log('clicked')
            if(clicked) {
                animatedValue.value = withSpring(0)
            } else {
                animatedValue.value = withSpring(1)
            }
            setClicked( prev => !prev)
        }}>
            <Text>Animate</Text>
        </Pressable>
    </View>
  );
};

export default Practise;

const styles = StyleSheet.create({});
