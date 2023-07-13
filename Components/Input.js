import {TextInput, StyleSheet} from 'react-native';

function Input({
  placeholder,
  onChange,
  value,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#c9d1d9"
      onChangeText={text => onChange(text)}
      value={value}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#89b4dc',
  },
});
export default Input;
