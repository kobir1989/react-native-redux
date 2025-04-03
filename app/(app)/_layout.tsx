import { Redirect, Stack } from 'expo-router';

import { useAuth } from '@/redux/authSlice';
import { ActivityIndicator } from 'react-native';

const AppLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <ActivityIndicator size='large' color='#0000ff' />;
  }

  if (!isAuthenticated) {
    return <Redirect href='/auth' />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AppLayout;
