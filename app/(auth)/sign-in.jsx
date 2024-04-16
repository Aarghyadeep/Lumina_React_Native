import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { images } from "../../constants";
import FormField from '../../components/FormField';
import CustomButton from "../../components/CustomButton";
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

export default function SignIn() {
  
    const [Form, setForm] = useState({
      email: '',
      password: '',
    });
    
    const { setUser, setIsLoggedIn } = useGlobalContext();
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const submit = async()=> {
      if(!Form.password === '' || !Form.email ==='') {
       Alert.alert('Error', 'Please fill in all the fields!')
      } 
      
      setIsSubmitting(true);
     
      try {
        await signIn(Form.email, Form.password);
        const result = await getCurrentUser();
        setUser(result);
        setIsLoggedIn(true); 

        router.replace('/home'); 
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
   } 

  return (
    <SafeAreaView className='bg-primary h-full'>
     <ScrollView>
      <View className='w-full min-h-[83vh] justify-center px-4 my-6'>
        <Image
        source={images.logo}
        resizeMode='contain'
        className='w-[200px] h-[50px] self-center'
        />
        <Text className='text-2xl font-semibold text-white
        mt-10 font-psemibold self-center'>
          Log in to Lumina
        </Text>
       <FormField
       title="Email"
       value={Form.email}
       handleChangeText={(e) => setForm({ ...Form, email: e })}
       otherStyles = 'mt-7'
       keyboardType="email-address"
       /> 
       <FormField
       title="Password"
       value={Form.password}
       handleChangeText={(e) => setForm({ ...Form, password: e })}
       otherStyles = 'mt-7'
       />
       <CustomButton
       title="Sign In"
       handlePress={submit}
       containerStyle="mt-7"
       isLoading={isSubmitting}
       />
       <View className='justify-center pt-5 flex-row gap-2'>
        <Text className='text-lg font-pregular text-gray-100'>
          Don't have an account?
          </Text> 
         <Link href="/sign-up"
         className='text-lg font-psemibold text-secondary'>
           Sign Up
         </Link>
        </View> 
      </View>
     </ScrollView>
    </SafeAreaView>
  )
}