// https://www.youtube.com/watch?v=_WXvlby00Y8&list=PLlydFsFRbxJ014OZDMcn_kdjH6rglaWfB&index=4
import { Heart } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';

const image = require("../../assests/images/manWithFlower.jpg")

const width = Dimensions.get("window").width;


const DoubleTapInstaLike = () => {

    const scale = useSharedValue(0);

    const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
        scale.value = withSpring( 1.2, undefined, (isFinished) => {
            scale.value = withDelay( 200, withTiming(0))
        })
    })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{scale: scale.value }]
    }))
    
  return (
    <View className=' flex-1 justify-center items-center'>

    <View className=' relative'>
        <GestureDetector gesture={doubleTap}>
            <Image source={image} style={{ width: width * 0.9, height: width * 0.9 }} />
        </GestureDetector>
        <View className='absolute top-0 bottom-0  left-0 right-0 flex-1 justify-center items-center'>
            <Animated.View style={animatedStyle} className={"w-20 h-20 flex justify-center items-center"} >
                <Heart fill={"#ED4956"} color="#ED4956" size={60} />
            </Animated.View>
        </View>
    </View>
    <Text className=' mt-6 text-lg tracking-wider'>
        Double Tap to like
    </Text>
        
    </View>
  );
};

export default DoubleTapInstaLike;

