import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#Bda475', // Cor do título das abas ativas
        tabBarInactiveTintColor: '#ccc', // Cor do título das abas inativas
        tabBarLabelStyle: {
          fontSize: 10, // Tamanho do texto do título
        },
        tabBarStyle: {
          backgroundColor: '#181d31', // Cor de fundo da barra
          borderTopWidth: 0, // Remove a borda superior
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home" // Ícone do Ionicons
              size={24} // Tamanho do ícone
              color={focused ? '#Bda475' : '#ccc'} // Cor do ícone
            />
          ),
          headerShown: false, // Esconde o cabeçalho
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ focused }) => (
            <Feather
              name="search" // Ícone do Feather
              size={24} // Tamanho do ícone
              color={focused ? '#Bda475' : '#ccc'} // Cor do ícone
            />
          ),
          headerShown: false, // Esconde o cabeçalho
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Carteira',
          tabBarIcon: ({ focused }) => (
            <Feather
              name="star" // Ícone do Feather
              size={24} // Tamanho do ícone
              color={focused ? '#Bda475' : '#ccc'} // Cor do ícone
            />
          ),
          headerShown: false, // Esconde o cabeçalho
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user" // Ícone do Feather
              size={24} // Tamanho do ícone
              color={focused ? '#Bda475' : '#ccc'} // Cor do ícone
            />
          ),
          headerShown: false, // Esconde o cabeçalho
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
