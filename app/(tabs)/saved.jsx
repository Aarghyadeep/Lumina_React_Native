import { View, Text, FlatList, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import { getLikedPosts } from "../../lib/appwrite";
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';

export default function Saved() {

  const { user } = useGlobalContext(); 

  const [ refreshing, setRefreshing ] = useState(false);

  const onRefresh = async()=> {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
  }

    const { data: posts, refetch } = useAppwrite(()=> getLikedPosts(user.$id));


  return (
    <SafeAreaView className='bg-primary h-full'>
       <FlatList
      data={posts}
       keyExtractor={(item) => item.$id}
       renderItem={({ item }) => (
        <VideoCard video={item} />
       )}
       ListHeaderComponent={()=> (
        <View className='my-6 px-4 space-y-6 mb-10'>
          <View className='justify-between items-start
          flex-row mb-6'>
           <View>
            <Text className='text-2xl font-psemibold text-white'>
              Saved Videos
            </Text>
           </View>
          </View>

          <SearchInput placeholder="Search for your saved videos" />

        </View>
       )}
       ListEmptyComponent={() => (
        <EmptyState
        title="No videos found"
        subtitle="Like a video to add to your saved collections"
        hideButton
        />
       )}
       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
       />
    </SafeAreaView>
  )
}