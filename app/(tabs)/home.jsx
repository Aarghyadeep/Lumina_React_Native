import { View, Text, FlatList, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';

export default function Home() {

  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const [ refreshing, setRefreshing ] = useState(false);

  const onRefresh = async()=> {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
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
        <View className='my-6 px-4 space-y-6'>
          <View className='justify-between items-start
          flex-row mb-6'>
           <View>
            <Text className='font-pmedium text-sm text-gray-100'>
              Welcome Back
            </Text>
            <Text className='text-2xl font-psemibold text-white'>
              Aarghyadeep
            </Text>
           </View>

           <View className='mt-1.5'>
             <Image
             source={images.logoSmall}
             className='w-11 h-11'
             resizeMode='contain'
             />
           </View>
          </View>

          <SearchInput />

          <View className='w-full flex-1 pb-8 pt-5'>
           <Text className='text-gray-100 text-lg
           font-pregular mb-3'>
            Latest Videos
           </Text>

           <Trending
           posts={latestPosts ?? []}
           />
          </View>
        </View>
       )}
       ListEmptyComponent={() => (
        <EmptyState
        title="No videos found"
        subtitle="Be the first one to upload a video"
        />
       )}
       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
       />
    </SafeAreaView>
  )
}