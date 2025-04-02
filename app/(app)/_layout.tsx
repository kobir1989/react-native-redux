import { Stack } from 'expo-router';

import ProtectedRoute from '@/components/ProtectedRoute';

const AppLayout = () => {
  return (
    <ProtectedRoute>
      <Stack screenOptions={{ headerShown: false }} />
    </ProtectedRoute>
  );
};

export default AppLayout;
