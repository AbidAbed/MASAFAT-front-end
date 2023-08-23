import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import useValidating from '../Hooks/useValidating';
import Input from '../Components/Input';
import Button from '../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {
  changePath,
  popHistory,
  pushHistory,
  usePutUserMutation,
} from '../Store/SotreInterface';
import BackButton from '../Components/BackButton';
import Menu from '../Components/Menu';

function Profile() {
  const user = useSelector(state => state.user);
  const [fullName, setFullName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errors, setErrors] = useState('');

  const [putUserResponse, putUser] = usePutUserMutation();
  useEffect(() => {
    if (!putUserResponse.isUninitialized && !putUserResponse.isLoading) {
      if (putUserResponse.isError) {
        setErrors('something went wrong, try again');
      } else {
        dispatch(changePath('/login'));
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

  const handleEdit = () => {
    let _errors_ = '';

    if (!validateEmail(email)) {
      _errors_ += 'Invalid email, ';
    }

    if (!validatePhoneNumber(phoneNumber)) {
      _errors_ += 'Invalid phone number, ';
    }

    if (!validateFullName(fullName)) {
      _errors_ += 'Invalid full name, ';
    }

    if (!validatePassword(password)) {
      _errors_ += 'Invalid password, ';
    }

    if (!validateRePassword(password, rePassword)) {
      _errors_ += 'Passwords do not match.';
    }

    setErrors(_errors_);

    if (_errors_ !== '') return;
    else {
      putUser({
        id: user.id,
        name: fullName,
        phoneNumber: phoneNumber, //Unique string
        email: email, //Unique String
        password: password,
      });
    }

    setErrors('');
  };

  function onFullNameChange(text) {
    setFullName(text);

    if (!validateFullName(text)) {
      setErrors(
        'Please enter a valid full name consisting of Latin letters of 4 sections, e.g., Ahmad Mohammad Osama Abed',
      );
    } else setErrors('');
  }

  function onPhoneNumberChange(text) {
    setPhoneNumber(text);

    if (!validatePhoneNumber(text)) {
      setErrors(
        'Please enter a valid phone number that starts with 009627, e.g., 00962786314075',
      );
    } else setErrors('');
  }

  function onEmailChange(text) {
    setEmail(text);

    if (!validateEmail(text)) {
      setErrors('Please enter a valid email, e.g., example@example.com');
    } else setErrors('');
  }

  function onPasswordChange(text) {
    setPassword(text);

    if (!validatePassword(text)) {
      setErrors(
        'Password requires: 1 small letter, 1 capital letter, 1 symbol, 1 number, and a minimum length of 8',
      );
    } else setErrors('');
  }

  function onRePasswordChange(text) {
    setRePassword(text);

    if (!validateRePassword(text)) {
      setErrors("Password and re-entered password don't match");
    } else setErrors('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.barView}>
        <BackButton />
        <Menu />
      </View>
      <Text style={styles.text}>Profile</Text>
      <Input
        placeholder="Full Name"
        onChange={onFullNameChange}
        value={fullName}
        editable={false}
      />
      <Input
        placeholder="Phone Number"
        onChange={onPhoneNumberChange}
        value={phoneNumber}
        keyboardType="phone-pad"
        editable={false}
      />
      <Input
        placeholder="Email"
        onChange={onEmailChange}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={false}
      />
      <Input
        placeholder="New password"
        onChange={onPasswordChange}
        value={password}
        secureTextEntry={true}
      />
      <Input
        placeholder="Re-enter new password"
        onChange={onRePasswordChange}
        value={rePassword}
        secureTextEntry={true}
      />
      <Button buttonText="Submit" onClick={handleEdit} />
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
  barView: {
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 60,
    paddingHorizontal: '2%',
    marginBottom: 10,
    position: 'absolute',
    top: '3%',
    left: '5%',
    zIndex: 1,
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
    color: '#D25157',
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 50,
    textAlign: 'left',
    color: '#ccc',
    position: 'absolute',
    top: '3%',
  },
});

export default Profile;
