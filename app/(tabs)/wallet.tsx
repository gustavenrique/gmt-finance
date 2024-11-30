import React, { useEffect, useState } from "react";
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
import orderRepository from "@/infra/order.repository";
import { account } from "@/infra/user.repository";

const Wallet = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [quantity, setQuantity] = useState(10);

  useEffect(() => {
    (async () => {
      const userId = (await account.get()).$id;

      const orders = await orderRepository.getOrdersByUser(userId)
    })()
  }, [])

  const positions = [
    { id: 1, name: "Microsoft", quantity: 54, investedValue: 0, currentValue: 0, ticker: "MSFT", logo: "" },
    { id: 2, name: "Apple", quantity: 32, investedValue: 0, currentValue: 0, ticker: "AAPL", logo: "" },
    { id: 3, name: "Meta", quantity: 132, investedValue: 0, currentValue: 0, ticker: "META", logo: "" },
    { id: 4, name: "Nvidia", quantity: 65, investedValue: 0, currentValue: 0, ticker: "NVDA", logo: "" },
    { id: 5, name: "Novo Nordisk", quantity: 11, investedValue: 0, currentValue: 0, ticker: "NVO", logo: "" },
    { id: 6, name: "Amazon", quantity: 45, investedValue: 0, currentValue: 0, ticker: "AMZN", logo: "" },
    { id: 7, name: "Tesla", quantity: 23, investedValue: 0, currentValue: 0, ticker: "TSLA", logo: "" },
    { id: 8, name: "Netflix", quantity: 43, investedValue: 0, currentValue: 0, ticker: "NFLX", logo: "" },
    { id: 9, name: "Google", quantity: 676, investedValue: 0, currentValue: 0, ticker: "GOOGL", logo: "" },
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
        {positions.map((action) => (
          <View key={action.id} style={styles.actionCard}>
            <Text style={styles.actionText}>{action.name}</Text>
            <Text style={styles.actionSymbol}>({action.ticker})</Text>
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
