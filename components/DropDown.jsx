import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import { useGlobalContext } from '../context/GlobalProvider';
import { toggleLike } from '../lib/appwrite';
import { useEffect, useState } from 'react';

export default function DropDown({ id, liked }) {
   
  const {  user } = useGlobalContext();
  const [isLiked, setIsLiked] = useState(false);
  
  
  useEffect(()=> {
    const beenLiked = liked.some(obj => obj.$id === user.$id);
    if(beenLiked){
        setIsLiked(true);
     }
  }, []);


  const toggleLiked = async()=> {
      try {
          const res = await toggleLike(id, user.$id);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLiked(!isLiked);
      }
  }

  return (
    <View className='flex flex-col w-36 h-24 bg-gray-800 absolute top-14 z-10
    right-2 rounded-md'>
        { isLiked ? (
           <TouchableOpacity className='flex-1 items-center justify-center flex-row 
           gap-2' onPress={toggleLiked}>
           <AntDesign name="like1" size={20} color="red" />
          <Text className='text-white'>Liked</Text>
           </TouchableOpacity> 
        ) : (
            <TouchableOpacity className='flex-1 items-center justify-center flex-row 
            gap-2' onPress={toggleLiked}>
            <AntDesign name="like2" size={20} color="white" />
           <Text className='text-white'>Like</Text>
            </TouchableOpacity>
        ) }
        <View className='border-[0.5px] border-gray-700' />
        <TouchableOpacity className='flex-1 items-center justify-center flex-row 
        gap-2'>
        <Fontisto name="share" size={18} color="white" />
       <Text className='text-white'>Share</Text>
        </TouchableOpacity>
    </View>
  )
}