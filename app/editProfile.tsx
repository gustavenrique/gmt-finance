import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { useRouter } from 'expo-router'; // Importando useRouter para navegação
import { Colors } from '@/constants/Colors';
import { updateUserProfile, account } from '../lib/appwrite'; // Importando a função de atualização

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [messageVisible, setMessageVisible] = useState(false); // Estado para controle da mensagem
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animação para a mensagem de sucesso
  const router = useRouter(); // Instanciando o router para navegação

  // Função para buscar dados do usuário no Appwrite
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await account.get(); // Pega os dados do usuário logado
        setUsername(user.name); // Atualiza o estado com o nome
        setEmail(user.email); // Atualiza o estado com o e-mail
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  // Função para salvar as alterações e mostrar a mensagem de sucesso
  const handleSaveChanges = async () => {
    try {
      // Atualiza o perfil do usuário no Appwrite
      await updateUserProfile(username, email);
      console.log('Alterações salvas!');

      // Exibe a mensagem de sucesso
      setMessageVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      // Redireciona para a tela de perfil após 3 segundos
      setTimeout(() => {
        router.push('/profile'); // Redireciona para a tela de perfil
      }, 3000);
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Digite seu nome"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>

      {/* Exibição da mensagem de sucesso */}
      {messageVisible && (
        <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
          <Text style={styles.successMessage}>Alterações salvas!</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    color: Colors.black,
    fontSize: 16,
    marginBottom: 20,
  },
  saveButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#BDA475',
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  messageContainer: {
    position: 'absolute',
    bottom: 20, // Ajusta a posição para ficar na parte inferior da tela
    left: '50%', // Centraliza horizontalmente
    transform: [{ translateX: -150 }], // Ajusta para centralizar com base no texto
    padding: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  successMessage: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default EditProfile;
