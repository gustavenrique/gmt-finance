import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { useRouter } from "expo-router"; // Importando useRouter para navegação
import { Colors, messageBoxStyle } from "@/constants/Colors";
import { updateUserProfile, account } from "../lib/appwrite"; // Importando a função de atualização

const EditProfile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    style: object;
  } | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const user = await account.get();
        setUsername(user.name);
        setEmail(user.email);
        setCurrentUser(user);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    })();
  }, []);

  const handleSaveChanges = async () => {
    try {
      await updateUserProfile(username, email, password);

      showMessage({
        text: "Alterações salvas!",
        style: messageBoxStyle.successMessage,
      });

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        router.push("/profile");
      }, 3000);
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      showMessage({
        text: error.message,
        style: messageBoxStyle.errorMessage,
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
      <View style={styles.profileContainer}>
        <div style={styles.inputContainer}>
          <Text style={styles.label}>Nome</Text>

          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Digite seu nome"
            placeholderTextColor="#888"
          />
        </div>

        <div style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>

          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu email"
            placeholderTextColor="#888"
          />
        </div>

        {currentUser?.email != email && (
          <div style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>

            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Digite sua senha"
              secureTextEntry
              placeholderTextColor="#888"
            />
          </div>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        {message?.text && (
          <Animated.View
            style={[messageBoxStyle.messageContainer, { opacity: fadeAnim }]}
          >
            <Text style={message.style}>{message.text}</Text>
          </Animated.View>
        )}
      </View>
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
    alignItems: "center",
    marginTop: 30,
    padding: 15,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    paddingRight: 15,
  },
  input: {
    width: "100%",
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
    color: Colors.black,
    fontSize: 16,
  },
  saveButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#BDA475",
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: 15,
  },
});

export default EditProfile;
