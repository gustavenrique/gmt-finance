import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Para ícones
import { Colors } from '@/constants/Colors';

const Wallet = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [quantity, setQuantity] = useState(10); // Quantidade inicial de ações

  const actions = [
    { id: 1, name: 'Ação 1', symbol: 'A1' },
    { id: 2, name: 'Ação 2', symbol: 'A2' },
    { id: 3, name: 'Ação 3', symbol: 'A3' },
    { id: 4, name: 'Ação 4', symbol: 'A4' },
    { id: 5, name: 'Ação 5', symbol: 'A5' },
    { id: 6, name: 'Ação 6', symbol: 'A6' },
  ];

  // Função para alternar entre mostrar e esconder o valor
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  // Função para aumentar a quantidade
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Função para diminuir a quantidade
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Topo com o valor da carteira */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Saldo da Carteira</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balanceValue}>
            {showBalance ? 'R$ 10.000,00' : '****'}
          </Text>
          <TouchableOpacity onPress={toggleBalanceVisibility}>
            {/* Ícone ajustado dentro do TouchableOpacity */}
            <Feather name={showBalance ? 'eye-off' : 'eye'} size={20} color="#Bda475" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Ações do usuário */}
      <ScrollView contentContainerStyle={styles.actionsContainer}>
        {actions.map((action) => (
          <View key={action.id} style={styles.actionCard}>
            <Text style={styles.actionText}>{action.name}</Text>
            <Text style={styles.actionSymbol}>({action.symbol})</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
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
    fontWeight: 'bold',
    color: '#fff',
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  balanceValue: {
    fontSize: 24,
    color: '#fff',
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%', // Tamanho das ações para 2 por linha
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  actionSymbol: {
    fontSize: 14,
    color: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  quantityText: {
    fontSize: 16,
    color: '#fff',
    marginHorizontal: 15,
  },
});

export default Wallet;
