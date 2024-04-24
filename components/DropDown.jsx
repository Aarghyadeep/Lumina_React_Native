import { View, Text, TouchableOpacity, Share } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import { useGlobalContext } from '../context/GlobalProvider';
import { toggleLike } from '../lib/appwrite';
import { useEffect, useState } from 'react';

export default function DropDown({ id, liked, video  }) {
   
  const {  user } = useGlobalContext();
  const [isLiked, setIsLiked] = useState(false);
  const beenLiked = liked.includes(user.$id);
   
  useEffect(()=> {
     if(beenLiked){
      setIsLiked(true);
     }
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this video: ${video}`,
      });
    } catch (error) {
      console.error('Error sharing video:', error.message);
    }
  };
  

  const toggleLiked = async()=> {
      try {
          const res = await toggleLike(id, user.$id);
          console.log(res);
          if(res.includes(user.$id)){
            setIsLiked(true);
          }else {
            setIsLiked(false);
          }
      } catch (error) {
        console.log(error);
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
        gap-2' onPress={handleShare}>
        <Fontisto name="share" size={18} color="white" />
       <Text className='text-white'>Share</Text>
        </TouchableOpacity>
    </View>
  )
}