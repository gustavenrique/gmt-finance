import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { loginUser } from "../../lib/appwrite"; // Importe a função de login

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para exibir mensagens de erro
  const router = useRouter(); // Inicializa o router para navegação

  const handleLogin = async () => {
    setErrorMessage("");
    try {
      const response = await loginUser(email, password); // Usando a função de login correta
      console.log("Login successful:", response);
      router.push("/home"); // Redireciona para a página inicial após o login
    } catch (error) {
      console.error("Login failed:", error.message);
      setErrorMessage(error.message); // Exibe a mensagem de erro
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <div>
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </div>
      <Text style={styles.footerText}>
        Não tem uma conta?{" "}
        <Text
          style={styles.link}
          onPress={() => {
            router.push("/sign-up");
          }}
        >
          Registre-se
        </Text>
      </Text>
      <Text
        style={styles.link}
        onPress={() => {
          router.push("/home");
        }}
      >
        Home
      </Text>
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
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
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
  errorText: {
    color: "red", // Cor para erros
    fontSize: 14,
    marginBottom: 15,
    fontWeight: "bold",
  },
});

export default SignIn;
