import { View, Text, Image, TouchableOpacity, Share } from 'react-native';
import { icons } from '../constants';
import { useEffect, useState } from 'react';
import { ResizeMode, Video } from 'expo-av';
import { toggleLike } from '../lib/appwrite';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { useGlobalContext } from '../context/GlobalProvider';


export default function VideoCard({ video: {
    $id,
    title,
    thumbnail,
    video,
    creator: { username, avatar, photo },
    liked,
} }) {
    
    const {  user } = useGlobalContext();
    const [play, setPlay] = useState();
    const [isLiked, setIsLiked] = useState(false);
    const beenLiked = liked.includes(user?.$id);
   
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
          const res = await toggleLike($id, user?.$id);
          console.log(res);
          if(res.includes(user?.$id)){
            setIsLiked(true);
          }else {
            setIsLiked(false);
          }
      } catch (error) {
        console.log(error);
      } 
  }

  return (
    <View className='flex-col items-center px-4 mb-14'>
        <View className='flex-row relative'>
          <View className='justify-center items-center flex-row flex-1'>
            <View className='w-[46px] h-[46px] rounded-lg border border-secondary
            justify-center items-center p-0.5'>
              {photo === '' ? (
                <Image
                source={{ uri: avatar }}
                className='w-full h-full rounded-lg'
                resizeMode='cover'
                />
              ): (
                <Image
                source={{ uri: photo }}
                className='w-full h-full rounded-lg'
                resizeMode='cover'
                />
              )}
            </View>

            <View className='justify-center flex-1 ml-3 gap-y-1'>
             <Text className='text-white font-psemibold text-sm'
             numberOfLines={1}>
                {title}
             </Text>
             <Text className='text-xs text-gray-100 font-pregular'
             numberOfLines={1}>
                {username}
             </Text>
            </View>
          </View>
          <View className='right-3 gap-2 flex-row items-center absolute'>
          { isLiked ? (
           <TouchableOpacity className='flex-1 items-center justify-center flex-row 
           gap-2' onPress={toggleLiked}>
           <AntDesign name="like1" size={25} color="red" />
           </TouchableOpacity> 
        ) : (
            <TouchableOpacity className='flex-1 items-center justify-center flex-row 
            gap-2' onPress={toggleLiked}>
            <AntDesign name="like2" size={25} color="white" />
            </TouchableOpacity>
        ) }
        <TouchableOpacity className='flex-1 items-center justify-center flex-row 
        gap-2' onPress={handleShare}>
        <Fontisto name="share" size={20} color="white" />
        </TouchableOpacity>
          </View>
        </View>


       {play ? (
        <Video
        source={{ uri: video }}
        className='w-full h-60 rounded-xl mt-3'
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        shouldPlay
        onPlaybackStatusUpdate={(status)=> {
          if(status.didJustFinish){
            setPlay(false);
          }
        }} 
        />
       ): (
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=> setPlay(true)}
        className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
        >
            <Image
            source={{ uri: thumbnail }}
            className='w-full h-full rounded-xl'
            resizeMode='cover'
            />
            <Image
            source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
            />
        </TouchableOpacity>
       )} 
    </View>
  )
}