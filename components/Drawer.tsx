import React, { forwardRef, PropsWithChildren } from 'react';
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View } from 'react-native';

type DrawerProps = PropsWithChildren<{
  width?: number;
  position?: 'left' | 'right';
  onClose: () => void;
}>;

const Drawer = forwardRef<DrawerLayoutAndroid, DrawerProps>(
  ({ children, width = 300, position = 'left', onClose }, ref) => {
    const navigationView = () => (
      <View style={[styles.container, styles.navigationContainer]}>
        <Text style={styles.paragraph}>I'm in the Drawer!</Text>
        <Button title='Close drawer' onPress={onClose} />
      </View>
    );

    return (
      <DrawerLayoutAndroid
        ref={ref}
        drawerWidth={width}
        drawerPosition={position}
        renderNavigationView={navigationView}
      >
        {children}
      </DrawerLayoutAndroid>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Drawer;
