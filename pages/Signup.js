import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import useValidating from '../Hooks/useValidating';
import Input from '../Components/Input';
import Button from '../Components/Button';
import {useDispatch} from 'react-redux';
import {
  changePath,
  popHistory,
  pushHistory,
  usePostSignupMutation,
} from '../Store/SotreInterface';
import BackButton from '../Components/BackButton';
import logoImage from '../Assets/MASAFAT_LOGO.png';
import {fetchUser} from '../Store/Slices/UserSlice';
function Signup() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errors, setErrors] = useState('');
  const [postSignup, postSignupResponse] = usePostSignupMutation();

  useEffect(() => {
    if (!postSignupResponse.isUninitialized && !postSignupResponse.isLoading) {
      if (postSignupResponse.isError) {
        setErrors('something went wrong , try again');
      } else {
        dispatch(changePath('/map'));
        dispatch(fetchUser(postSignupResponse.data));
        dispatch(pushHistory("/map"))
      }
    }
  }, [postSignupResponse]);
  const {
    validateEmail,
    validatePassword,
    validateFullName,
    validatePhoneNumber,
    validateRePassword,
  } = useValidating();
  const dispatch = useDispatch();
  //trying to push with my account
  function handleLogin() {
    dispatch(changePath('/login'));
    dispatch(popHistory());
  }

  const handleSignup = () => {
    let _errors_ = '';

    // Validate full name
    if (!validateEmail(email)) {
      _errors_ += 'Invalid email , ';
    }

    // Validate phone number
    if (!validatePhoneNumber(phoneNumber)) {
      _errors_ += 'invalid phone number , ';
    }

    // Validate email
    if (!validateFullName(fullName)) {
      _errors_ += 'invalid full name , ';
    }

    // Validate password
    if (!validatePassword(password)) {
      _errors_ += 'invalid password , ';
    }

    if (!validateRePassword(password, rePassword)) {
      _errors_ += 'Passwords do not match.';
    }

    setErrors(_errors_);

    if (_errors_ !== '') return;
    else {
      postSignup({name: fullName, phoneNumber, email, password});
    }

    setErrors('');
  };

  function onFullNameChange(text) {
    setFullName(text);

    if (!validateFullName(text)) {
      setErrors(
        'please enter a valid full name consists of latin latters of 4 sections, ex :ahmad mohammad osama abed',
      );
    } else setErrors('');
  }

  function onPhoneNumberChange(text) {
    setPhoneNumber(text);

    if (!validatePhoneNumber(text)) {
      setErrors(
        'Please enter a valid phone that starts with 009627 number ex : 00962786314075',
      );
    } else setErrors('');
  }

  function onEmailChange(text) {
    setEmail(text);

    if (!validateEmail(text)) {
      setErrors('Please enter a valid email ex : example @ example.com');
    } else setErrors('');
  }

  function onPasswordChange(text) {
    setPassword(text);

    if (!validatePassword(text)) {
      setErrors(
        'Password requires: 1 small letter, 1 capital letter, 1 symbol, 1 number, and minimum length of 8',
      );
    } else setErrors('');
  }

  function onRePasswordChange(text) {
    setRePassword(text);

    if (!validateRePassword(text)) {
      setErrors("password and re entered password don't match");
    } else setErrors('');
  }

  return (
    <View style={styles.container}>
      <BackButton></BackButton>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.title}>Signup for Masafat</Text>
      <Input
        placeholder="Full Name"
        onChange={onFullNameChange}
        value={fullName}
        secureTextEntry={false}
      />
      <Input
        placeholder="Phone Number"
        onChange={onPhoneNumberChange}
        value={phoneNumber}
        keyboardType="phone-pad"
        secureTextEntry={false}
      />
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
      <Input
        placeholder="Re-enter Password"
        onChange={onRePasswordChange}
        value={rePassword}
        secureTextEntry={true}
      />
      <Button buttonText="Signup" onClick={handleSignup} />
      {errors !== '' && <Text style={styles.errorText}>{errors}</Text>}
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.touchableText}>
          Already have an account? Login instead
        </Text>
      </TouchableOpacity>
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

export default Signup;
