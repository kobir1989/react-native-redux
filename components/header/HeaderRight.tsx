import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const HeaderRight = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.title}>KH</Text>
    </TouchableOpacity>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#aaa',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1d3147',
  },
});
