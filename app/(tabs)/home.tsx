import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const Home = () => {
  const [stocks, setStocks] = useState([]);
  const [dollarRate, setDollarRate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const apiKey = 'csobmo1r01qt3r34952gcsobmo1r01qt3r349530'; // Substitua com sua chave da API Finnhub

  // Função para buscar ações aleatórias
  const fetchRandomStocks = async () => {
    const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NFLX', 'KO', 'JNJ', 'NVDA', 'INTC', 'AMD', 'BMW']; // Exemplos de símbolos
    const randomSymbols = symbols.sort(() => 0.5 - Math.random()).slice(0, 4); // Seleciona 4 símbolos aleatórios

    try {
      const requests = randomSymbols.map((symbol) =>
        axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
      );
      const responses = await Promise.all(requests);

      const stocksData = responses.map((response, index) => ({
        symbol: randomSymbols[index],
        price: response.data.c,
        change: response.data.d,
        changePercent: response.data.dp,
      }));

      setStocks(stocksData);
    } catch (error) {
      console.error('Erro ao buscar ações:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar cotação do dólar
  const fetchDollarRate = async () => {
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=USD/BRL&token=${apiKey}`
      );
      setDollarRate(response.data.c);
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
      {/* Círculos decorativos */}
      <View style={styles.circleRow}>
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index} style={styles.circle} />
        ))}
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
                    color={favorites.includes(stock.symbol) ? '#FFD700' : '#aaa'}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.stockFooter}>
                <Text style={styles.stockPrice}>${stock.price.toFixed(2)}</Text>
                <Text
                  style={[
                    styles.stockChange,
                    { color: stock.change > 0 ? '#32CD32' : '#FF4500' },
                  ]}
                >
                  {stock.change > 0 ? '+' : ''}
                  {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Nova View de Ação Aleatória */}
      <View style={styles.newStockContainer}>
        <Text style={styles.newStockHeader}>Nova Ação Aleatória</Text>
        <Text style={styles.newStockSymbol}>GOOGL</Text> {/* Exemplo de nova ação */}
        <Text style={styles.newStockPrice}>${(Math.random() * 2000).toFixed(2)}</Text>
        <Text style={styles.newStockChange}>+{(Math.random() * 10).toFixed(2)} (0.5%)</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#000229',
    padding: 20,
  },
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 350,
    marginTop: 20,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#283246',
    borderWidth: 1,
    borderColor: '#BDA475',
  },
  loader: {
    marginTop: 20,
  },
  dollarContainer: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#283246',
    width: 350,
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
    color: '#BDA475',
  },
  stocksContainer: {
    marginTop: 30,
    width: '100%',
  },
  stockCard: {
    backgroundColor: '#283246',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
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
    color: '#BDA475',
    fontWeight: 'bold',
  },
  stockChange: {
    fontSize: 16,
    textAlign: 'right',
  },
  newStockContainer: {
    marginTop: 30,
    backgroundColor: '#283246',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  newStockHeader: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  newStockSymbol: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  newStockPrice: {
    fontSize: 24,
    color: '#BDA475',
    fontWeight: 'bold',
  },
  newStockChange: {
    fontSize: 16,
    color: '#32CD32',
    marginTop: 5,
  },
});

export default Home;
