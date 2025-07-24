// https://www.youtube.com/watch?v=Y7q7cOxPZ2Q&list=PLlydFsFRbxJ014OZDMcn_kdjH6rglaWfB&index=5

import { Search, X } from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions, Pressable, TextInput, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const width = Dimensions.get('window').width;

const SearchBar = () => {

  const pressValue = useSharedValue(false);
  const [showSearch, setShowSearch] = useState(false);

  const searchAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(pressValue.value ? 0 : 1, { duration: 300 }),
  }));

  const crossAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(pressValue.value ? 1 : 0, { duration: 300 }),
  }));

  const searchBarWidthAnimatedStyle = useAnimatedStyle(() => ({
    width: withTiming(pressValue.value ? width * 0.7 : 0, { duration: 500 }),
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(pressValue.value ? '#e7e7e7' : '#fff', {
      duration: 500,
    }),
  }));

  return (
    <View className=" flex-1 items-center justify-center ">
      <Animated.View
        style={containerAnimatedStyle}
        className="flex-row  items-center justify-between rounded-xl"
      >
        <Animated.View
          style={searchBarWidthAnimatedStyle}
          className=" overflow-hidden"
        >
          <TextInput
            placeholderTextColor={'#333'}
            className=" px-4 text-black"
            placeholder="What are u looking for?"
          />
        </Animated.View>
        <View>
          {showSearch ? (
            <Animated.View className={'p-4'} style={crossAnimatedStyle}>
              <Pressable
                onPress={() => {
                  pressValue.value = false;
                  setShowSearch(false);
                }}
              >
                <X />
              </Pressable>
            </Animated.View>
          ) : (
            <Animated.View style={searchAnimatedStyle}>
              <Pressable
                onPress={() => {
                  pressValue.value = true;
                  setShowSearch(true);
                }}
              >
                <Search />
              </Pressable>
            </Animated.View>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

export default SearchBar;
