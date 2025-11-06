// E:\DevArea\simulado-app\navigation\AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import ResultsScreen from '../screens/ResultsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Menu de Simulados' }} />
      <Stack.Screen name="Quiz" component={QuizScreen} options={({ route }) => ({ title: `Simulado de ${route.params.subject}` })} />
      <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Gabarito', headerLeft: null }} />
    </Stack.Navigator>
  );
}
