import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';


import { icons } from "../constants";
import { router, usePathname } from 'expo-router';

export default function SearchInput({ initialQuery }) {
   
      const pathname = usePathname();

        const [query, setQuery] = useState(initialQuery || '');

  return (
       <View className='w-full h-16 px-4 bg-black-200 border-slate-800 border-2 
       rounded-2xl focus:border-secondary items-center flex-row space-x-4'>
        <TextInput
        className='text-base mt-0.5 text-white flex-1 font-pregular'
        placeholder="Search for a video topic"
        placeholderTextColor="#CDCDE0"
        value={query}
        onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity
        onPress={()=> {
            if(!query){
                return Alert.alert('Missing query', 
            'Please input something to search result across database');
            }

            if(pathname.startsWith('/search')){
                router.setParams({ query });
            } else {
                router.push(`search/${query}`);
            }
        }}
        >
            <Image
            source={icons.search}
            className='w-5 h-5'
            resizeMode='contain'
            />
        </TouchableOpacity>
       </View>
  )
}