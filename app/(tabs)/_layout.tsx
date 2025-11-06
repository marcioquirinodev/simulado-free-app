import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <>
      {/* Isso define o cabeçalho para a tela de menu */}
      <Stack.Screen options={{ title: 'Menu de Simulados', headerShown: true }} />
      <Tabs screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Menu',
          }}
        />
      </Tabs>
    </>
  );
}
