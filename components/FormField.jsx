import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';


import { icons } from "../constants";

export default function FormField({ 
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
 }) {
   
      const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
       <Text className='text-base text-gray-100 font-pmedium'>
           {title}
       </Text>
       <View className='w-full h-16 px-4 bg-black-200 border-red-500 border-2 
       rounded-2xl focus:border-secondary items-center flex-row'>
        <TextInput
        className='flex-1 text-white font-psemibold text-base'
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        value={value}
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword} 
        />

        {title === 'Password' && (
            <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
              <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className='w-6 h-6'
              resizeMode='contain'
              />
            </TouchableOpacity>
        )}
       </View>
    </View>
  )
}