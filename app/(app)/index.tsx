import { Text, View, Button } from 'react-native';
import { logout, useAuth } from '@/redux/authSlice';
import { removeItemFromStorage } from '@/libs/expoSecureStore';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';

const HomeScreen = () => {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logout());
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
