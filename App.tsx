/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { StyleSheet,View } from 'react-native';
import Practise from './components/common/Practise';
import "./global.css"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PanDecay from './components/learnings/PanDecay';

function App() {
  return (
    <GestureHandlerRootView className=' flex-1'>
        <View className=' bg-white flex-1'>
            {/* <Practise /> */}
            <PanDecay/>
        </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
