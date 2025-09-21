import { View } from 'react-native';
import './global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Practise from './src/components/common/Practise';
import { SafeAreaProvider } from 'react-native-safe-area-context';
function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className=" flex-1">
        <View className=" flex-1 bg-white">
          <Practise />
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
