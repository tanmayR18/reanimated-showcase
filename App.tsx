import { View } from 'react-native';
import './global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Practise from './src/components/common/Practise';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import BootSplash from "react-native-bootsplash";
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };
    init().finally(async () => {
      await BootSplash.hide({ fade: true });
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className=" flex-1">
       <AppNavigator />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
