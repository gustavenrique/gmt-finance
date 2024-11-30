import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { account } from "../../lib/appwrite";
import { Colors } from "@/constants/Colors";

const Profile = () => {
  const [messageVisible, setMessageVisible] = useState(false);
  const [username, setUsername] = useState(""); // Adicionado estado para armazenar o nome do usuário
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = await account.get(); // Obtém as informações do usuário logado
        setUsername(user.name); // Atualiza o estado com o nome do usuário
      } catch (error) {
        console.error("Erro ao obter o usuário:", error);
      }
    };

    fetchUsername(); // Chama a função para buscar o nome do usuário
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSessions();
      showLogoutMessage();
      setTimeout(() => router.push("/sign-in"), 3000);
    } catch (error) {
      console.error("Erro no logout:", error);
      showErrorLogoutMessage();
    }
  };

  const showLogoutMessage = () => {
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

  const showErrorLogoutMessage = () => {
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

  const handleEditProfile = () => {
    router.push("/editProfile");
  };

  const options = [
    {
      title: "Dados Cadastrais",
      icon: "file-text",
      onPress: handleEditProfile,
    },
    { title: "Ajuda", icon: "help-circle" },
    { title: "Configurações", icon: "settings" },
    { title: "Sair", icon: "log-out", onPress: handleLogout },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImage} />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>
            {username ? username : "Seu Nome"}
          </Text>{" "}
          {/* Exibe o nome ou valor padrão */}
        </View>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={option.onPress}
          >
            <View style={styles.optionTextContainer}>
              <Feather name={option.icon} size={20} color="#BDA475" />
              <Text style={styles.optionText}>{option.title}</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#BDA475" />
          </TouchableOpacity>
        ))}
      </View>

      {messageVisible && (
        <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
          <Text style={styles.successMessage}>
            Logout realizado com sucesso!
          </Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingLeft: 15,
    paddingTop: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.accent,
  },
  profileDetails: {
    marginLeft: 20,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.white,
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.white,
  },
  messageContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  successMessage: {
    color: Colors.white,
    fontSize: 14,
    textAlign: "center",
  },
});

export default Profile;
