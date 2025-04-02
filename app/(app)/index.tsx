import { Text, View, Button } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { removeItemFromStorage } from '@/libs/expoSecureStore';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await removeItemFromStorage('token');
    await removeItemFromStorage('user');
    router.replace('/auth');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome, {user?.name}!</Text>
      <Button onPress={handleLogout} title='Logout' color='#cc2121' />
    </View>
  );
};

export default HomeScreen;
