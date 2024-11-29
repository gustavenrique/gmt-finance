import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { account } from '../../lib/appwrite'; // Importa o serviço de autenticação do Appwrite

const TabsLayout = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = await account.get(); // Obtém as informações do usuário logado
        setUsername(user.name); // Atualiza o estado com o nome do usuário
      } catch (error) {
        console.error('Erro ao obter o usuário:', error);
      }
    };

    fetchUsername(); // Chama a função para buscar o nome do usuário
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.primary }}>
      {/* Header personalizado */}
      <View style={styles.headerContainer}>
        <Text style={styles.greetingText}>Olá, {username || 'usuário'}</Text> {/* Exibe o nome ou um valor padrão */}
        <Feather name="bell" size={24} color="#fff" />
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

const styles = {
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    height: 60,
    backgroundColor: Colors.primary,
  },
  greetingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
};

export default TabsLayout;
