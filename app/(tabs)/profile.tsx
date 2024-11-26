import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Hook de navegação


const Profile = () => {

  const options = [
    { title: 'Dados Cadastrais', icon: 'file-text'}, 
    { title: 'Ajuda', icon: 'help-circle' },
    { title: 'Configurações', icon: 'settings' },
    { title: 'Sair', icon: 'log-out' },
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
    backgroundColor: '#000435', // Fundo principal
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
    backgroundColor: '#BDA475', // Cor para simular a foto
  },
  profileDetails: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Texto branco
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
    color: '#fff', // Texto branco
  },
});

export default Profile;
