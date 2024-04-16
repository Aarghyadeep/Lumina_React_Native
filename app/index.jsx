import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from "../constants";
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {

  const { isLoading, isLoggedIn } = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href={"/home"} />
    
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full items-center justify-center min-h-[85vh] px-4"> 
         <Image
         source={images.logo}
         className='w-[250px] h-[84px]'
         resizeMode='contain'
         />

         <Image
         source={images.cards}
         className='max-w-[380px] w-full h-[300px]'
         resizeMode='contain'
         />

         <View className='relative mt-5'>
           <Text className='text-3xl text-white font-bold text-center'>
           Creating Brilliance in Every Pixel with
           <Text className='text-secondary-200'> Lumina</Text>
           </Text>
           <Image
            source={images.path}
            className='w-[136px] h-[15px] absolute -bottom-2 right-11'
           />
         </View>
         <Text className='text-sm font-pregular mt-7 text-gray-100 text-center'>
         Spark Your Imagination, Illuminate Your Content - Unravel Endless Possibilities with Lumina
         </Text>
         <CustomButton
         title="Continue with Email"
         handlePress= {()=> router.push('sign-in')}
         containerStyle= 'w-full mt-7' 
         />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light' />
    </SafeAreaView>
  );
}
