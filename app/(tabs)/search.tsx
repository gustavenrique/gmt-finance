import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image, // Importação do componente Image
} from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stockDetails, setStockDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const apiKey = 'csobmo1r01qt3r34952gcsobmo1r01qt3r349530';

  // Formatar data de IPO
  const formatIPODate = (date) => {
    if (!date) return 'N/A';
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  // Formatar valor de mercado - versão inicial
  const formatMarketCap = (value) => {
    if (!value) return 'N/A';
    return `${(value / 1000).toFixed(1)}B`; // Exemplo: 3456 -> 3,4B
  };

  // Função para buscar detalhes da ação
  const fetchStockDetails = async () => {
    if (!searchTerm) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${searchTerm}&token=${apiKey}`
      );
      const profileResponse = await axios.get(
        `https://finnhub.io/api/v1/stock/profile2?symbol=${searchTerm}&token=${apiKey}`
      );

      setStockDetails({
        ...response.data,
        ...profileResponse.data,
      });
    } catch (error) {
      console.error('Erro ao buscar detalhes da ação:', error);
      setStockDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar ação (ex: MSFT)..."
          placeholderTextColor="#aaa"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={fetchStockDetails}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.accent} />
      ) : stockDetails ? (
        <View style={styles.overviewContainer}>
          <View style={styles.overviewHeader}>
            <Text style={styles.symbol}>{stockDetails.ticker || 'N/A'}</Text>
            <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
              <FontAwesome
                name={isFavorite ? 'star' : 'star-o'}
                size={28}
                color={isFavorite ? Colors.accent : '#aaa'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${stockDetails.c || 'N/A'}</Text>
            <Text
              style={[ 
                styles.change, 
                { color: stockDetails.d > 0 ? '#32CD32' : '#FF4500' }
              ]}
            >
              {stockDetails.d > 0 ? '+' : ''}
              {stockDetails.d || 'N/A'} ({stockDetails.dp || 'N/A'}%)
            </Text>
          </View>
        </View>
      ) : null}

      {stockDetails && (
        <ScrollView style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>Mais informações:</Text>
          {/* Exibição da logo acima do nome */}
          {stockDetails.logo && (
            <Image
              source={{ uri: stockDetails.logo }}
              style={styles.logo}
              resizeMode="contain"
            />
          )}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nome:</Text>
            <Text style={styles.detailValue}>{stockDetails.name || 'N/A'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Setor:</Text>
            <Text style={styles.detailValue}>
              {stockDetails.finnhubIndustry || 'N/A'}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>País:</Text>
            <Text style={styles.detailValue}>
              {stockDetails.country || 'N/A'}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Data de IPO:</Text>
            <Text style={styles.detailValue}>
              {formatIPODate(stockDetails.ipo)}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Valor de Mercado:</Text>
            <Text style={styles.detailValue}>
              {formatMarketCap(stockDetails.marketCapitalization)}
            </Text>
          </View>
        </ScrollView>
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
  searchContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  searchInput: {
    fontSize: 18,
    color: '#fff',
    height: 50,
  },
  overviewContainer: {
    backgroundColor: Colors.secondary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  symbol: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 28,
    color: Colors.accent,
    fontWeight: 'bold',
  },
  change: {
    fontSize: 18,
  },
  detailsContainer: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 15,
  },
  detailsTitle: {
    fontSize: 15,
    fontWeight: 'light',
    color: '#fff',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: Colors.accent,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Search;