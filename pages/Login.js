import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import useValidating from '../Hooks/useValidating';
import Input from '../Components/Input';
import Button from '../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {
  changePath,
  pushHistory,
  usePostLoginMutation,
} from '../Store/SotreInterface';
import logoImage from '../Assets/MASAFAT_LOGO.png';
import {fetchUser} from '../Store/Slices/UserSlice';

const Login = () => {
  const [email, setEmail] = useState('test5@masafat.edu');
  const [password, setPassword] = useState('P@ss2Word');
  const [errors, setErrors] = useState('');
  const {validateEmail, validatePassword} = useValidating();
  const dispatch = useDispatch();
  const [postLogin, postLoginResponse] = usePostLoginMutation();

  function handleSignup() {
    dispatch(changePath('/signup'));
    dispatch(pushHistory('/signup'));
  }

  function handleForgetPassword() {
    dispatch(changePath('/rePass'));
    dispatch(pushHistory('/rePass'));
  }

  const handleLogin = () => {
    // Perform input validation
    let _errors_ = '';
    if (!validateEmail(email)) {
      _errors_ += 'Please enter a valid email .';
    }

    if (!validatePassword(password)) {
      _errors_ += 'Please enter a valid password .';
    }

    setErrors(_errors_);

    if (_errors_ !== '') return;
    else {
      postLogin({email, password});
    }

    setErrors('');
  };

  useEffect(() => {
    if (!postLoginResponse.isUninitialized && !postLoginResponse.isLoading) {
      if (postLoginResponse.isError) {
        setErrors('invalid email or password');
      } else {
        dispatch(changePath('/map'));
        dispatch(fetchUser(postLoginResponse.data));
        dispatch(pushHistory('/map'));
      }
    }
  }, [postLoginResponse]);

  function onEmailChange(text) {
    setEmail(text);

    if (!validateEmail(text)) {
      setErrors('Please enter a valid email');
    } else setErrors('');
  }

  function onPasswordChange(text) {
    setPassword(text);

    if (!validatePassword(text)) {
      setErrors('Please enter a valid password');
    } else setErrors('');
  }

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.title}>Welcome to Masafat</Text>

      <Input
        placeholder="Email"
        onChange={onEmailChange}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        secureTextEntry={false}
      />

      <Input
        placeholder="Password"
        onChange={onPasswordChange}
        value={password}
        secureTextEntry={true}
      />
      <Button buttonText="Login" onClick={handleLogin}/>

      {errors !== '' && <Text style={styles.errorText}>{errors}</Text>}

      <TouchableOpacity onPress={handleSignup}>
        <Text style={styles.touchableText}>
          Don't have an account? Signup now
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgetPassword}>
        <Text style={styles.touchableText}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
  );
};

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

export default Login;
