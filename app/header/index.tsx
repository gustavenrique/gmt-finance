import { View, Text, Pressable } from 'react-native'
import { Ionicons, Feather} from '@expo/vector-icons'

export default function Heading () {
 return (
 <View className='flex-1  w-full flex flex-row items-center justify-between'>
    <Pressable className='w-10 h-10 bg-secondary rounded-full flex justify-center items-center'>
        <Feather name="user" size={20} color="#ffffff"></Feather>
    </Pressable>
        <View>
            <Text className='text-lg font-bold text-white'>Olá gggggg</Text>
        </View>

    <Pressable className='w-10 h-10 bg-secondary rounded-full flex justify-center items-center'>
        <Feather name="bell" size={20} color="#ffffff"></Feather>
    </Pressable>
  </View>

 );
}