import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from '../screens/Category/CategoriesScreen';
import AnimationsListScreen from '../screens/Category/AnimationsListScreen';
import DemoScreen from '../screens/Category/DemoScreen';
import ContributorsScreen from '../screens/Contributor/ContributorsScreen';
import SettingsScreen from '../screens/Setting/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// ---------- Types ------------
export type RootStackParamList = {
  MainTabs: undefined;
  Terms: undefined;
};

export type HomeStackParamList = {
  Categories: undefined;
  AnimationsList: { category: string };
  Demo: { animationId: string };
};

export type RootTabParamList = {
  HomeStack: undefined;
  Contributors: undefined;
  Settings: undefined;
};

// -------- Home Stack ----------

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Categories" component={CategoriesScreen} />
      <HomeStack.Screen
        name="AnimationsList"
        component={AnimationsListScreen}
      />
      <HomeStack.Screen name="Demo" component={DemoScreen} />
    </HomeStack.Navigator>
  );
}

// ----------- Tabs -----------
const Tab = createBottomTabNavigator<RootTabParamList>();
function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
      <Tab.Screen name="Contributors" component={ContributorsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// -------- Root Stack ---------
const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="MainTabs"
          component={TabsNavigator}
          options={{ headerShown: false }}
        />

        {/* <RootStack.Screen name="Terms" component={TermsScreen} /> */}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
