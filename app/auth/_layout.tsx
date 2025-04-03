import React from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/redux/authSlice';

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href='/' />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#fff' },
      }}
    />
  );
};

export default AuthLayout;
