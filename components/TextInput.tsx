import {
  StyleSheet,
  Text,
  View,
  TextInput as Input,
  TextInputProps,
  TextStyle,
} from 'react-native';

type InputProps = TextInputProps & {
  labelText?: string;
  inputLabelStyle?: TextStyle;
  inputFieldStyle?: TextStyle;
  error?: string;
};

const TextInput = ({
  labelText = '',
  inputLabelStyle = {},
  inputFieldStyle = {},
  error,
  ...props
}: InputProps) => {
  const border = error ? styles.redBorder : {};
  return (
    <View>
      {labelText ? <Text style={[styles.inputLableText, inputLabelStyle]}>{labelText}</Text> : null}
      <Input style={[styles.inputField, inputFieldStyle, border]} {...props} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  inputLableText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  inputField: {
    backgroundColor: '#F6F6F6',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
    color: '#2c2c2c',
  },
  redBorder: {
    borderColor: '#cc2121',
    borderWidth: 1.5,
  },
  errorText: {
    marginTop: 2,
    fontSize: 14,
    color: '#cc2121',
  },
});
