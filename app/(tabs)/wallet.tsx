import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // Para ícones
import { Colors, QuantityAdjustmentStyle } from "@/constants/Style";

const Wallet = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [quantity, setQuantity] = useState(10);

  const actions = [
    { id: 1, name: "Ação 1", symbol: "A1" },
    { id: 2, name: "Ação 2", symbol: "A2" },
    { id: 3, name: "Ação 3", symbol: "A3" },
    { id: 4, name: "Ação 4", symbol: "A4" },
    { id: 5, name: "Ação 5", symbol: "A5" },
    { id: 6, name: "Ação 6", symbol: "A6" },
    { id: 7, name: "Ação 7", symbol: "A7" },
    { id: 8, name: "Ação 8", symbol: "A8" },
    { id: 9, name: "Ação 9", symbol: "A9" },
    { id: 10, name: "Ação 10", symbol: "A10" },
    { id: 11, name: "Ação 11", symbol: "A11" },
    { id: 12, name: "Ação 12", symbol: "A12" },
  ];

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Saldo da Carteira</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceValue}>
            {showBalance ? "R$ 10.000,00" : "****"}
          </Text>
          <TouchableOpacity onPress={toggleBalanceVisibility}>
            <Feather
              name={showBalance ? "eye-off" : "eye"}
              size={20}
              color="#Bda475"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.actionsContainer}>
        {actions.map((action) => (
          <View key={action.id} style={styles.actionCard}>
            <Text style={styles.actionText}>{action.name}</Text>
            <Text style={styles.actionSymbol}>({action.symbol})</Text>
            <View style={QuantityAdjustmentStyle.quantityContainer}>
              <TouchableOpacity
                onPress={decreaseQuantity}
                style={QuantityAdjustmentStyle.quantityButton}
              >
                <Text style={QuantityAdjustmentStyle.quantityButtonText}>
                  -
                </Text>
              </TouchableOpacity>
              <Text style={QuantityAdjustmentStyle.quantityText}>
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={increaseQuantity}
                style={QuantityAdjustmentStyle.quantityButton}
              >
                <Text style={QuantityAdjustmentStyle.quantityButtonText}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary, // Cor de fundo
    padding: 20,
  },
  balanceContainer: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  balanceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  balanceValue: {
    fontSize: 24,
    color: "#fff",
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    width: "48%", // Tamanho das ações para 2 por linha
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    justifyContent: "center",
  },
  actionText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  actionSymbol: {
    fontSize: 14,
    color: "#fff",
  },
});

export default Wallet;
