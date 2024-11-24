import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router';




const SignIn = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000435' }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {/* Div no topo contendo a imagem */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#faf7e4', // Tom mais claro de azul
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
              
            </View>
    
            {/* Botão centralizado */}
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
    

export default SignIn