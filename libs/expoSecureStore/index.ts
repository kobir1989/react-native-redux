import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

type StorageKey = 'token' | 'user';

// function to set the token asynchronously
export const saveItemToStorage = async (key: StorageKey, value: any): Promise<void> => {
  try {
    if (isWeb) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
    throw error;
  }
};

// function to get the token asynchronously
export const getItemFromStorage = async (key: StorageKey): Promise<any | null> => {
  try {
    if (isWeb) {
      return localStorage.getItem(key);
    }
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return null;
  }
};

export const removeItemFromStorage = async (key: StorageKey): Promise<void> => {
  try {
    if (isWeb) {
      localStorage.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
    throw error;
  }
};
