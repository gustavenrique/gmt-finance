import React from 'react';
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import Heading from '../header/index'; // Importando o Heading
import { Colors } from '@/constants/Colors';

const TabsLayout = () => {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary, }}>
      {/* Adicionando o Heading acima das tabs */}
      <View style={{ paddingHorizontal: 15, paddingTop: 10, height: 60, alignItems: 'center', justifyContent: 'center' }}>
        <Heading />
      </View>

      {/* Definindo as tabs */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.accent,
          tabBarInactiveTintColor: '#ccc',
          tabBarLabelStyle: {
            fontSize: 10,
          },
          tabBarStyle: {
            backgroundColor: Colors.primary,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Início',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="home"
                size={24}
                color={focused ? Colors.accent : '#ccc'}
              />
            ),
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="search"
          options={{
            title: 'Buscar',
            tabBarIcon: ({ focused }) => (
              <Feather
                name="search"
                size={24}
                color={focused ? Colors.accent : '#ccc'}
              />
            ),
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="wallet"
          options={{
            title: 'Carteira',
            tabBarIcon: ({ focused }) => (
              <Ionicons name="card" size={30} color={focused ? Colors.accent : '#ccc'} />
            ),
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ focused }) => (
              <Feather
                name="user"
                size={24}
                color={focused ? Colors.accent : '#ccc'}
              />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;
