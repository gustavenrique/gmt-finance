import { View, Text, Pressable } from 'react-native'
import { Feather} from '@expo/vector-icons'
import { Colors } from '@/constants/Colors';

export default function Heading () {
 return (
 <View className='flex-1  w-full flex flex-row items-center justify-between'>
        <View>
            <Text className='text-lg font-bold text-white'>Olá...</Text>
        </View>

    <Pressable className='w-10 h-10 flex justify-center items-center'>
        <Feather name="bell" size={20} color="#bda475"></Feather>
    </Pressable>
  </View>

 );
}