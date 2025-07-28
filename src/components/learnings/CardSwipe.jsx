import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BellOff,
  CircleUserRound,
  Delete,
  DeleteIcon,
  MessageCircleMore,
  Phone,
  Trash,
} from 'lucide-react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const data = [
  { id: 1, name: 'Tanmay' },
  { id: 2, name: 'Kushal' },
  { id: 3, name: 'Aditya' },
  { id: 4, name: 'Devendra' },
  { id: 5, name: 'Nitesh' },
  { id: 6, name: 'Alok' },
  { id: 7, name: 'Sujal' },
];

const SwipeCard = () => {
  const [users, setUsers] = useState(data);

  const insets = useSafeAreaInsets();

  const keyExtractor = item => item.id.toString();

  const ItemSeperatorComponent = useCallback(() => {
    return <View className=" h-4" />;
  }, []);

  const ListEmptyComponent = useCallback(() => {
    return (
      <Text className="mt-10 text-center text-xl tracking-widest text-[#b1aeae]">
        No Chats available
      </Text>
    );
  }, []);

  return (
    <View
      className=" px-5"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Text className=" mt-6 text-lg ">Swipe to perform actions</Text>

      {/* Optimized FlatList according to you  */}
      <FlatList
        data={users}
        className=" mt-5"
        contentContainerStyle={styles.Flatlist}
        keyExtractor={keyExtractor}
        // renderItem={RenderItem}
        renderItem={({ item }) => (
          <RenderItem setUsers={setUsers} item={item} />
        )}
        ItemSeparatorComponent={ItemSeperatorComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default SwipeCard;

const styles = StyleSheet.create({
  Flatlist: { paddingHorizontal: 0 },
});

const RenderItem = ({ item, setUsers }) => {
  const translateX = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const swipedRightAlready = useSharedValue(false);

  const onRightSwipeAction = () => {
    setUsers(prev => prev.filter(user => user.id !== item.id));
  };

  const swipe = Gesture.Pan()
    .onStart(() => {
      // Reset flag for new gesture
      swipedRightAlready.value = false;
    })
    .onUpdate(e => {
      const nextX = offsetX.value + e.translationX;

      // Handle right swipe (limit to 60px)
      if (nextX > 150 && !swipedRightAlready.value) {
        swipedRightAlready.value = true;

        // Snap back to 0 immediately
        translateX.value = withTiming(0);
        offsetX.value = 0;

        // Trigger action (API call or state update)
        runOnJS(onRightSwipeAction)(item?.id);
      } else if (!swipedRightAlready.value) {
        // Allow left up to -150, right up to 60
        translateX.value = Math.min(Math.max(nextX, -150), 150);
      }
    })
    .onEnd(() => {
      // Handle left swipe logic
      if (translateX.value < -100) {
        translateX.value = withTiming(-150);
        offsetX.value = -150;
      } else {
        translateX.value = withTiming(0);
        offsetX.value = 0;
      }
    });

  const animatedTranslateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      borderRadius: translateX.value < 0 ? 0 : 6,
    };
  });

  const animatedIconsStyle = useAnimatedStyle(() => ({
    // transform: [{ scale: interpolate(translateX.value, [-100, 0], [1, 0]) }],
    width: interpolate(translateX.value, [-150, 0], [50, 0]),
  }));

  const animatedTrashIconsStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(translateX.value, [150, 0], [1, 0.3]) }],
  }));

  return (
    <GestureDetector gesture={swipe}>
      <View className="relative">
        <View className=" absolute left-0 top-0 h-full w-full flex-row items-center justify-between rounded-lg bg-red-500 pl-8">
          <Animated.View style={animatedTrashIconsStyle}>
            <Trash />
          </Animated.View>

          <View className=" h-full flex-row items-center overflow-hidden rounded-r-lg bg-white">
            <Animated.View
              style={animatedIconsStyle}
              className={
                'h-full items-center justify-center overflow-hidden bg-yellow-400'
              }
            >
              <MessageCircleMore />
            </Animated.View>
            <Animated.View
              style={animatedIconsStyle}
              className={
                'h-full items-center justify-center overflow-hidden bg-green-400'
              }
            >
              <Phone />
            </Animated.View>
            <Animated.View
              style={animatedIconsStyle}
              className={
                'h-full items-center justify-center overflow-hidden bg-blue-400'
              }
            >
              <BellOff />
            </Animated.View>
          </View>
        </View>
        <Animated.View
          style={[animatedTranslateStyle]}
          className=" flex-row items-center gap-2 rounded-lg bg-slate-100  p-6"
        >
          <View className=" flex-row items-center gap-2">
            <CircleUserRound size={34} />
            <Text className=" text-lg text-[#333]">{item.name}</Text>
          </View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};
