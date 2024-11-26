import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router'; // Se estiver usando Expo Router
import { Colors } from '@/constants/Colors';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Inicializa o router para navegação

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

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

      <TouchableOpacity style={styles.button} onPress={() => {
      router.push('/home'); 
      }}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Não tem uma conta?{' '}
        <Text
          style={styles.link}
          onPress={() => {
            router.push('/sign-up'); // Navega para a página de registro
          }}
        >
          Registre-se
        </Text>
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
    backgroundColor: Colors.primary, // Cor de fundo personalizada
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.white, // Texto branco
  },
  subtitle: {
    fontSize: 16,
    color: Colors.white, // Texto branco
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: Colors.white,
    color: Colors.black, // Texto preto dentro do campo
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: Colors.accent, // Cor personalizada do botão
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white, // Texto branco do botão
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: Colors.white, // Texto branco no rodapé
  },
  link: {
    color: Colors.accent, // Cor personalizada do link
    fontWeight: 'bold',
  },
});

export default SignIn;
