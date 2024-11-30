import { StyleSheet } from "react-native";

export const Colors = {
  primary: "#050617", // Cor principal
  secondary: "#1f202f", // Cor secundária
  accent: "#BDA475", // Cor de destaque
  white: "#FFFFFF",
  black: "#000000",
  green: "#32CD32", // Cor verde
  red: "#FF4500", // Cor vermelha
  gold: "#FFD700",
  gray: "#ccc", // Cor dourada
};

export const messageBoxStyle = StyleSheet.create({
  messageContainer: {
    position: "absolute",
    bottom: 50,
    padding: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 5,
    alignItems: "center",
  },
  successMessage: {
    color: Colors.white,
    fontSize: 14,
    textAlign: "center",
  },
  errorMessage: {
    color: Colors.red,
    fontSize: 14,
    textAlign: "center",
  },
});
