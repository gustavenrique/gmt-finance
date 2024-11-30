import React, { useState, useRef } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { useRouter } from "expo-router"; // Usando o hook do Expo Router
import { ButtonStyle, Colors, MessageBoxStyle } from "@/constants/Style";
import { createUser } from "../../infra/user.repository"; // Certifique-se de importar a função de criação corretamente

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    style: object;
  } | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter(); // Hook para navegação

  const handleSignUp = async () => {
    try {
      await createUser(email, password, username);

      showMessage({
        text: "Cadastro realizado com sucesso!",
        style: MessageBoxStyle.successMessage,
      });

      setTimeout(() => router.push("/sign-in"), 3000); // Redirecionar após a mensagem desaparecer
    } catch (error) {
      console.error("Erro no cadastro:", error.message);
      showMessage({
        text: error.message,
        style: MessageBoxStyle.errorMessage,
      });
    }
  };

  const showMessage = (message: { text: string; style: object }) => {
    setMessage(message);

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
        }).start(() => setMessage(null));
      }, 3000);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Crie sua conta!</Text>
      <Text style={styles.subtitle}>Preencha os campos para se registrar</Text>

      <div style={{ padding: 40 }}>
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

        <TouchableOpacity style={ButtonStyle.button} onPress={handleSignUp}>
          <Text style={ButtonStyle.text}>Cadastrar</Text>
        </TouchableOpacity>
      </div>

      <Text style={styles.footerText}>
        Já tem uma conta?{" "}
        <Text
          style={styles.link}
          onPress={() => router.push("/sign-in")} // Redirecionar para login ao clicar
        >
          Faça login
        </Text>
      </Text>

      {message?.text && (
        <Animated.View
          style={[MessageBoxStyle.messageContainer, { opacity: fadeAnim }]}
        >
          <Text style={message.style}>{message.text}</Text>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.white,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: Colors.white,
    color: "#000",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: Colors.white,
  },
  link: {
    color: Colors.accent,
    fontWeight: "bold",
  },
});

export default SignUp;
