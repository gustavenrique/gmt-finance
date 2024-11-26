import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log('Nome de usuário:', username);
    console.log('Email:', email);
    console.log('Senha:', password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crie sua conta!</Text>
      <Text style={styles.subtitle}>Preencha os campos para se registrar</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="words"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Já tem uma conta?{' '}
        <Text style={styles.link}>Faça login</Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000229', // Cor de fundo personalizada
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff', // Texto branco
  },
  subtitle: {
    fontSize: 16,
    color: '#fff', // Texto branco
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#000', // Texto preto dentro do campo
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#BDA475', // Cor personalizada do botão
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Texto branco do botão
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#fff', // Texto branco no rodapé
  },
  link: {
    color: '#BDA475', // Cor personalizada do link
    fontWeight: 'bold',
  },
});

export default SignUp;
