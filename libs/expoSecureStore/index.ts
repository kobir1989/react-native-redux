import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

type StorageKey = 'token' | 'user';

// function to set the token asynchronously
export const saveItemToStorage = async (key: StorageKey, value: any): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error saving ${key}:`, error);
    throw error;
  }
};

// function to get the token asynchronously
export const getItemFromStorage = async (key: StorageKey): Promise<any | null> => {
  try {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`Error getting ${key}:`, error);
    return null;
  }
};

export const removeItemFromStorage = async (key: StorageKey): Promise<void> => {
  try {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
    throw error;
  }
};
