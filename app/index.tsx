import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';




export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000229' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#bda475', 
            paddingVertical: 40,
          }}
        >
          
        </View>

        
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: '#FFFFFF', 
              fontWeight: 'bold',
              textAlign: 'center',
              lineHeight: 34,
            }}
          >
            Bem-vindo ao melhor em investimentos globais!
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 16,
              color: '#BDA475', 
              textAlign: 'center',
            }}
          >
            Explore as oportunidades da bolsa americana.
          </Text>
        </View>

   
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: '#BDA475',
              paddingVertical: 15,
              paddingHorizontal: 40,
              borderRadius: 30,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
              width: '80%',
            }}
            onPress={() => {
              router.push('/home'); 
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              Acessar Conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
