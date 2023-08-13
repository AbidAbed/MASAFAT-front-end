import React, {useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import useValidating from '../Hooks/useValidating';
import Input from '../Components/Input';
import Button from '../Components/Button';
import {useDispatch} from 'react-redux';
import {changePath, pushHistory} from '../Store/SotreInterface';
import BackButton from '../Components/BackButton';
import logoImage from '../Assets/MASAFAT_LOGO.png';
function RePass() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState('');
  const {validateEmail} = useValidating();
  const dispatch = useDispatch();

  function handleLogin() {
    dispatch(changePath('/login'));
    dispatch(pushHistory('/login'));
  }

  function handleSignup() {
    dispatch(changePath('/signup'));
    dispatch(pushHistory('/signup'));
  }

  const handleForgotPassword = () => {
    let _errors_ = '';

    // Validate email
    if (!validateEmail(email)) {
      _errors_ += 'Please enter a valid email address. ';
    }

    setErrors(_errors_);


    if (_errors_ !== '') return;
    
    setErrors('');
  };

  function onEmailChange(text) {
    setEmail(text);

    if (!validateEmail(text)) {
      setErrors('Please enter a valid email');
    } else setErrors('');
  }

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <BackButton></BackButton>
      <Text style={styles.title}>Forgot your password?</Text>

      <Input
        placeholder="Email"
        onChange={onEmailChange}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        secureTextEntry={false}
      />

      <Button buttonText="Recover Password" onClick={handleForgotPassword} />

      {errors !== '' && <Text style={styles.errorText}>{errors}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1f2937',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#c9d1d9',
  },
  touchableText: {
    fontSize: 16,
    color: '#c9d1d9',
    padding: 20,
    fontStyle: 'italic',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default RePass;
