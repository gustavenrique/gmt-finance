import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';  
import { Ionicons } from '@expo/vector-icons'; 
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

const Home = () => {
  const [stocks, setStocks] = useState([]);
  const [dollarRate, setDollarRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const apiKeyFinnhub = 'csobmo1r01qt3r34952gcsobmo1r01qt3r349530'; 
  const apiKeyExchange = '103a357b6fb3b62d4a03d903'; 

  // Função para buscar ações aleatórias
  const fetchRandomStocks = async () => {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NFLX', 'KO', 'JNJ', 'NVDA', 'INTC', 'AMD']; 
    const randomSymbols = symbols.sort(() => 0.5 - Math.random()).slice(0, 4); 

    try {
      const requests = randomSymbols.map((symbol) =>
        axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKeyFinnhub}`)
      );
      const responses = await Promise.all(requests);

      const stocksData = responses.map((response, index) => ({
        symbol: randomSymbols[index],
        price: response.data.c ?? 0, // Define como 0 se o valor for null ou undefined
        change: response.data.d ?? 0,
        changePercent: response.data.dp ?? 0,
      }));

      setStocks(stocksData);
    } catch (error) {
      console.error('Erro ao buscar ações:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar cotação do dólar usando a ExchangeRate-API
  const fetchDollarRate = async () => {
    try {
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiKeyExchange}/latest/USD` // URL da ExchangeRate-API
      );
      setDollarRate(response.data.conversion_rates.BRL ?? 0); // A cotação para BRL (real brasileiro)
    } catch (error) {
      console.error('Erro ao buscar cotação do dólar:', error);
    }
  };

  // Alternar favorito
  const toggleFavorite = (symbol) => {
    if (favorites.includes(symbol)) {
      setFavorites(favorites.filter((fav) => fav !== symbol));
    } else {
      setFavorites([...favorites, symbol]);
    }
  };

  useEffect(() => {
    fetchRandomStocks();
    fetchDollarRate();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Círculos decorativos com textos abaixo */}
        <View style={styles.circleRow}>
          <View style={styles.circleWithText}>
            <View style={[styles.circle, { borderColor: Colors.accent }]}>
              <Feather name="codesandbox" size={30} color={Colors.gray} />
            </View>
            <Text style={styles.circleText}>GMT</Text>
          </View>
          <View style={styles.circleWithText}>
            <View style={[styles.circle, { borderColor: Colors.accent }]}>
              <Feather name="file" size={30} color={Colors.gray} />
            </View>
            <Text style={styles.circleText}>Dados</Text>
          </View>
          <View style={styles.circleWithText}>
            <View style={[styles.circle, { borderColor: Colors.accent }]}>
              <Ionicons name="analytics-outline" size={30} color={Colors.gray} />
            </View>
            <Text style={styles.circleText}>NASDAQ</Text>
          </View>
          <View style={styles.circleWithText}>
            <View style={[styles.circle, { borderColor: Colors.accent }]}>
              <Feather name="shield" size={30} color={Colors.gray} />
            </View>
            <Text style={styles.circleText}>Segurança</Text>
          </View>
          <View style={styles.circleWithText}>
            <View style={[styles.circle, { borderColor: Colors.accent }]}>
              <Feather name="help-circle" size={30} color={Colors.gray} />
            </View>
            <Text style={styles.circleText}>Ajuda</Text>
          </View>
        </View>

        {/* Cotação do dólar */}
        {dollarRate !== null ? (
          <View style={styles.dollarContainer}>
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png',
              }}
              style={styles.dollarFlag}
            />
            <Text style={styles.dollarText}>
              Cotação do dólar: <Text style={styles.dollarValue}>R${dollarRate.toFixed(2)}</Text>
            </Text>
          </View>
        ) : (
          <ActivityIndicator size="small" color="#BDA475" style={styles.loader} />
        )}

        {/* Título Ações em Tempo Real */}
        <Text style={styles.realtimeText}>Ações em tempo real</Text>

        {/* Ações aleatórias */}
        {loading ? (
          <ActivityIndicator size="large" color="#BDA475" style={styles.loader} />
        ) : (
          <View style={styles.stocksContainer}>
            {stocks.map((stock, index) => (
              <View key={index} style={styles.stockCard}>
                <View style={styles.stockHeader}>
                  <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                  <TouchableOpacity onPress={() => toggleFavorite(stock.symbol)}>
                    <FontAwesome
                      name={favorites.includes(stock.symbol) ? 'star' : 'star-o'}
                      size={24}
                      color={favorites.includes(stock.symbol) ? Colors.accent : '#aaa'}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.stockFooter}>
                  <Text style={styles.stockPrice}>${stock.price.toFixed(2)}</Text>
                  <Text
                    style={[styles.stockChange, { color: stock.change > 0 ? '#32CD32' : '#FF4500' }]}
                  >
                    {stock.change > 0 ? '+' : ''}
                    {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 20,
  },
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 0,
  },
  circleWithText: {
    alignItems: 'center',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary, // Cor de fundo dentro do círculo
    borderWidth: 1, // Borda de 1px
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#ccc',
    fontSize: 12,
    fontWeight: '300',
    marginTop: 5,
  },
  loader: {
    marginTop: 20,
  },
  dollarContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  dollarFlag: {
    width: 25,
    height: 17,
    marginRight: 10,
  },
  dollarText: {
    fontSize: 16,
    color: '#fff',
  },
  dollarValue: {
    fontWeight: 'bold',
    color: Colors.accent,
  },
  realtimeText: {
    marginTop: 20,
    fontSize: 15,
    color: '#ccc',
    fontWeight: 'light',
  },
  stocksContainer: {
    marginTop: 10,
    width: '100%',
  },
  stockCard: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 20,
    marginBottom: 8,
    alignItems: 'center',
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  stockSymbol: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  stockFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  stockPrice: {
    fontSize: 24,
    color: Colors.accent,
    fontWeight: 'bold',
  },
  stockChange: {
    fontSize: 16,
    textAlign: 'right',
  },
});

export default Home;
