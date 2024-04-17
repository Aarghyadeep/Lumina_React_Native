import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';


import { icons, images } from "../constants";

export default function SearchInput({ 
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
 }) {
   
      const [showPassword, setShowPassword] = useState(false);

  return (
       <View className='w-full h-16 px-4 bg-black-200 border-slate-800 border-2 
       rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
        <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular'
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        value={value}
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showPassword} 
        />

        <TouchableOpacity>
            <Image
            source={icons.search}
            className='w-5 h-5'
            resizeMode='contain'
            />
        </TouchableOpacity>
       </View>
  )
}