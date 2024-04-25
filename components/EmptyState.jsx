import { View, Text, Image } from 'react-native';

import { images } from '../constants';
import CustomButton from "../components/CustomButton";
import { router } from 'expo-router';

export default function EmptyState({ title, subtitle, hideButton }) {
  return (
    <View className='justify-center items-center px-4'>
       <Image
       source={images.empty}
       className='w-[270px] h-[210px]'
       resizeMode='contain'
       />
        <Text className='text-xl text-center mt-2 font-psemibold text-white'>
            {title}
        </Text>
       <Text className='font-pmedium text-sm text-gray-100'>
           {subtitle}
        </Text>
      
      {!hideButton && (
        <CustomButton
          title="Create video"
          handlePress={()=> router.push("/create")}
          containerStyle="w-full my-5"
        />  
      )}
    </View>
  )
}