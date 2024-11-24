import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = () => {
  return (
    <TouchableOpacity className={`bg-tertiary`}>
            <Text className='text-white'>Continuar com </Text>
    </TouchableOpacity>
  )
  
}

export default CustomButton