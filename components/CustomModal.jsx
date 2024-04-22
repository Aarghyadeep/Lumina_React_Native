import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

export default CustomModal = ({ message, isModalOpen, onClose }) => {

  if(isModalOpen !== true){
    return null;
  }

  return (
    <Modal transparent animationType="fade">
      <View className='flex-1 justify-center items-center bg-primary/80'>
        <View className='bg-[#333] p-5 rounded-[10px] items-center w-[80%]'>
          <Text className='text-white text-lg mb-5 text-center'>
            {message}
            </Text>
          <TouchableOpacity
          onPress={onClose}
          className='bg-[#555] py-[10px] px-5 rounded-md'>
            <Text className='text-white'>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

