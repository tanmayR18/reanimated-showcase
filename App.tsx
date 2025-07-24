/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { View } from 'react-native';
import './global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Practise from './src/components/common/Practise';

function App() {
  return (
    <GestureHandlerRootView className=" flex-1">
      <View className=" flex-1 bg-white">
        <Practise />
      </View>
    </GestureHandlerRootView>
  );
}

export default App;