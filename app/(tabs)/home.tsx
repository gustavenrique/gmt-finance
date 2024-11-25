import { View, Text, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#000435' }}>
      {/* Círculos */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: 350, marginTop: 20 }}>
        <View style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#283246',
          marginRight: 10,
          borderWidth: 1,
          borderColor: '#bda475',
        }} />
        <View style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#283246',
          marginRight: 10,
          borderWidth: 1,
          borderColor: '#bda475',
        }} />
        <View style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#283246',
          marginRight: 10,
          borderWidth: 1,
          borderColor: '#bda475',
        }} />
        <View style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#283246',
          marginRight: 10,
          borderWidth: 1,
          borderColor: '#bda475',
        }} />
        <View style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#283246',
          marginRight: 10,
          borderWidth: 1,
          borderColor: '#bda475',
        }} />
      </View>

      {/* View abaixo dos círculos */}
      <View style={{ marginTop: 25, alignItems: 'center', backgroundColor: '#283246', width: 350, height: 75, borderRadius: 10, flexDirection: 'row' }}>
        {/* Imagem à esquerda usando URI */}
        <Image 
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1200px-Flag_of_the_United_States.png' }} // Substitua com sua URI
          style={{ width: 25, height: 17, marginLeft: 10 }} // Ajuste o tamanho da imagem conforme necessário
        />
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', marginLeft: 10 }}>
          {/* Texto aqui */}
          Texto da cotação ou outro conteúdo
        </Text>
      </View>

      {/* Texto alinhado à esquerda */}
      <View style={{ marginTop: 30, alignItems: 'flex-start', width: 350 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
          As ações mais movimentadas de hoje:
        </Text>
      </View>

      {/* Outras Views */}
      <View style={{ marginTop: 10, alignItems: 'center', backgroundColor: '#283246', width: 350, height: 125, borderRadius: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
          {/* Texto aqui */}
        </Text>
      </View>

      <View style={{ marginTop: 10, alignItems: 'center', backgroundColor: '#283246', width: 350, height: 125, borderRadius: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
          {/* Texto aqui */}
        </Text>
      </View>

      <View style={{ marginTop: 10, alignItems: 'center', backgroundColor: '#283246', width: 350, height: 125, borderRadius: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
          {/* Texto aqui */}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
