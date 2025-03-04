import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { useRouter } from 'expo-router'; // Usando o hook do Expo Router
import { Colors } from '@/constants/Colors';
import { createUser } from '../../lib/appwrite'; // Certifique-se de importar a função de criação corretamente

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter(); // Hook para navegação

  const handleSignUp = async () => {
    try {
      await createUser(email, password, username);
      showSuccessMessage();
      setTimeout(() => router.push('/sign-in'), 3000); // Redirecionar após a mensagem desaparecer
    } catch (error) {
      console.error('Erro no cadastro:', error.message);
      showErrorMessage();
    }
  };

  const showSuccessMessage = () => {
    setMessageVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setMessageVisible(false));
      }, 3000);
    });
  };

  const showErrorMessage = () => {
    setMessageVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setMessageVisible(false));
      }, 3000);
    });
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
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Já tem uma conta?{' '}
        <Text
          style={styles.link}
          onPress={() => router.push('/sign-in')} // Redirecionar para login ao clicar
        >
          Faça login
        </Text>
      </Text>

      {messageVisible && (
        <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
          <Text style={styles.successMessage}>Cadastro realizado com sucesso!</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.white,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.white,
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
    color: '#000',
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: Colors.white,
  },
  link: {
    color: Colors.accent,
    fontWeight: 'bold',
  },
  messageContainer: {
    position: 'absolute',
    bottom: 50,
    padding: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 5,
    alignItems: 'center',
  },
  successMessage: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SignUp;
