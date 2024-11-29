import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Usando o expo-router
import { account } from '../../lib/appwrite'; // Certifique-se de importar o Appwrite corretamente
import { Colors } from '@/constants/Colors';

const Profile = () => {
  const router = useRouter(); // Hook do router para navegação

  // Função para realizar o logout
  const handleLogout = async () => {
    try {
      await account.deleteSessions(); // Encerra todas as sessões ativas
      Alert.alert('Logout', 'Você foi desconectado com sucesso.');

      // Redireciona para a tela de login após o logout
      router.push('/sign-in'); // Redirecionamento para a página de login
    } catch (error) {
      Alert.alert('Erro', 'Falha ao realizar logout. Tente novamente.');
      console.error('Erro no logout:', error);
    }
  };

  const options = [
    { title: 'Dados Cadastrais', icon: 'file-text' },
    { title: 'Ajuda', icon: 'help-circle' },
    { title: 'Configurações', icon: 'settings' },
    { title: 'Sair', icon: 'log-out', onPress: handleLogout }, // Ação de logout
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImage} />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>Seu Nome</Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={option.onPress} // Adicionando a função onPress
          >
            <View style={styles.optionTextContainer}>
              <Feather name={option.icon} size={20} color="#BDA475" />
              <Text style={styles.optionText}>{option.title}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#BDA475" />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary, // Fundo principal
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40, // Círculo
    backgroundColor: Colors.accent, // Cor para simular a foto
  },
  profileDetails: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white, // Texto preto
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Linha separadora
  },
  optionTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.white, // Texto preto
  },
});

export default Profile;
