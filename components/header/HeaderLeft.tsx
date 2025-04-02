import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const HeaderLeft = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logo</Text>
    </View>
  );
};

export default HeaderLeft;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1d3147',
  },
});
