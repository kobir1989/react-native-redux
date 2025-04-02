import { Slot, Stack } from 'expo-router';
import HeaderLeft from '@/components/header/HeaderLeft';
import HeaderRight from '@/components/header/HeaderRight';
import { RootProvider } from '@/components/providers/RootProvider';

export default function RootLayout() {
  return (
    <RootProvider>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          contentStyle: {
            paddingHorizontal: 20,
            paddingTop: 10,
            backgroundColor: '#fff',
          },
        }}
      >
        <Stack.Screen
          name='(app)'
          options={{
            title: '',
            headerLeft: () => <HeaderLeft />,
            headerRight: () => <HeaderRight />,
            contentStyle: { paddingHorizontal: 10, paddingTop: 10 },
          }}
        />

        <Stack.Screen
          name='auth'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='index'
          options={{
            title: 'TEST HOME',
          }}
        />
        <Slot />
      </Stack>
    </RootProvider>
  );
}
