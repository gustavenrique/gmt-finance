import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '@/constants/Colors';

const EditProfile = () => {
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');

  const handleSaveChanges = () => {
    // Lógica para salvar as alterações (pode ser uma chamada para o backend ou Appwrite)
    console.log('Alterações salvas!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Formulário de alteração de dados */}
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

        {/* Botão de salvar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000435', // Cor de fundo
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
    backgroundColor: '#BDA475',
    borderRadius: 8,
    color: '#fff',
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
});

export default EditProfile;
