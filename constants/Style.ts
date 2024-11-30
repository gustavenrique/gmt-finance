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

export const MessageBoxStyle = StyleSheet.create({
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

export const QuantityAdjustmentStyle = StyleSheet.create({
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  quantityText: {
    fontSize: 16,
    color: "#fff",
    marginHorizontal: 15,
  },
});

export const ButtonStyle = StyleSheet.create({
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    alignItems: "center",
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
