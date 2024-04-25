import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';

import EmptyState from '../../components/EmptyState';
import { getUserPosts, signOut, updatePhoto } from "../../lib/appwrite";
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';
import { useState } from 'react';


export default function Profile() {

  const { user, setUser, setIsLoggedIn } = useGlobalContext(); 
  
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
    const [image, setImage] = useState(null);

  const logout = async()=> {
     await signOut();
     setUser(null);
     setIsLoggedIn(false);
     router.replace('sign-in');
  }

  const openPicker = async()=> {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
     
    if(!result.canceled){
      setImage(result.assets[0]);
    }
    if(image !== null){
      await updatePhoto(image, user?.accountId, user?.$id);
    }
  }


  return (
    <SafeAreaView className='bg-primary h-full'>
       <FlatList
      data={posts}
       keyExtractor={(item) => item.$id}
       renderItem={({ item }) => (
        <VideoCard video={item} />
       )}
       ListHeaderComponent={()=> (
         <View className='w-full justify-center items-center mt-6
         mb-12 px-4'>
          <TouchableOpacity className='w-full mb-10 items-end'
          onPress={logout}>
               <Image
                source={icons.logout}
                className='w-6 h-6'
                resizeMode='contain'
               />
          </TouchableOpacity>
            
           <View className='w-16 h-16 rounded-lg relative'> 
           <View className='w-16 h-16 border border-secondary
           rounded-lg justify-center items-center'>
           { user?.photo === '' ? (
             <Image
             source={{ uri: user?.avatar }}
             className='w-[90%] h-[90%] rounded-lg' 
            />
           ): (
            <Image
            source={{ uri: user?.photo }}
            className='w-[90%] h-[90%] rounded-lg'
             />
           )}
           </View>
           <TouchableOpacity className='absolute bottom-0 right-0 bg-white rounded-xl'
           onPress={openPicker}>
           <Entypo name='circle-with-plus' size={20} color="black" />
           </TouchableOpacity>
            </View> 

           <InfoBox
           title={user?.username}
           containerStyles='mt-5'
           titleStyle='text-lg'
           />

           <View className='mt-5 flex-row'>
           <InfoBox
           title={posts.length || 0}
           subtitle="Posts"
           containerStyles='mr-10'
           titleStyle='text-xl'
           />
           <InfoBox
           title="1.2k"
           subtitle="Followers"
           titleStyle='text-xl'
           />
           </View>
         </View>
       )}
       ListEmptyComponent={() => (
        <EmptyState
        title="No videos found"
        subtitle="No videos found for this search query"
        />
       )}
       />
    </SafeAreaView>
  )
}