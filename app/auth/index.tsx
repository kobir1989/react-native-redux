import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TextInput from '@/components/TextInput';
import { useLoginMutation, useSignUpMutation } from '@/libs/api/authApi';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/redux/authSlice';

const INITIAL_STATE = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
};

const AuthScreen = () => {
  const [inputValues, setInputValues] = useState(INITIAL_STATE);
  const { email, userName, password, phone, confirmPassword } = inputValues;
  const [isSignUp, setIsSignUp] = useState(false);
  const [login, { isLoading: logingIn, error: loginError }] = useLoginMutation();
  const [signup, { isLoading: signingUp, error: signUpError, isSuccess: isSignUpSuccess }] =
    useSignUpMutation();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleResetState = () => {
    setInputValues(INITIAL_STATE);
  };

  useEffect(() => {
    if (isSignUpSuccess) {
      setIsSignUp(false);
    }
  }, [isSignUpSuccess]);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    try {
      await login({ email, password }).unwrap();
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    }
  };

  const handleSignup = () => {
    if (!email.trim() || !password.trim() || !userName.trim() || !phone.trim()) {
      Alert.alert('Error', 'All ther field are required!');
      return;
    }
    if (confirmPassword !== password) {
      Alert.alert('Error', 'Password did not match');
      return;
    }
    signup({ firstName: userName, email, password, lastName: userName, confirmPassword });
  };

  const handleSubmit = () => {
    if (isSignUp) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  const getError = (field: keyof typeof INITIAL_STATE) => {
    const error = isSignUp ? signUpError : loginError;
    if (!error) return '';

    if ('data' in error) {
      const errorData = error.data as Record<string, string>;
      return errorData[field] || errorData.message || '';
    }

    return '';
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContiner}>
        <Text style={styles.titleText}>Create Account </Text>
        <Text style={styles.subTitleText}>Signup to get started</Text>
      </View>

      <View style={styles.inputsContainer}>
        {isSignUp && (
          <TextInput
            placeholder='Enter you first and last name'
            placeholderTextColor='#aaa'
            labelText='Name'
            value={userName}
            onChangeText={(value) => setInputValues((prev) => ({ ...prev, userName: value }))}
            error={getError('userName')}
          />
        )}
        <TextInput
          placeholder='Email address'
          placeholderTextColor='#aaa'
          labelText='Email'
          value={email}
          onChangeText={(value) => setInputValues((prev) => ({ ...prev, email: value }))}
          keyboardType='email-address'
          autoCapitalize='none'
          error={getError('email')}
        />
        {isSignUp && (
          <TextInput
            placeholder='Phone number'
            placeholderTextColor='#aaa'
            labelText='Phone'
            value={phone}
            onChangeText={(value) => setInputValues((prev) => ({ ...prev, phone: value }))}
            error={getError('phone')}
          />
        )}
        <TextInput
          placeholder='Enter Password'
          placeholderTextColor='#aaa'
          labelText='Password'
          value={password}
          onChangeText={(value) => setInputValues((prev) => ({ ...prev, password: value }))}
          secureTextEntry
          textContentType='none'
          error={getError('password')}
        />
        {isSignUp && (
          <TextInput
            placeholder='Confirm Password'
            placeholderTextColor='#aaa'
            labelText='Confirm Password'
            value={confirmPassword}
            onChangeText={(value) =>
              setInputValues((prev) => ({ ...prev, confirmPassword: value }))
            }
            secureTextEntry
            textContentType='none'
            error={getError('confirmPassword')}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={handleSubmit}
        disabled={logingIn || signingUp}
      >
        <View>{(signingUp || logingIn) && <ActivityIndicator size='small' color='#fff' />} </View>
        <Text style={styles.createAccountButtonText}>Create Account</Text>
      </TouchableOpacity>

      <View style={styles.authNavigation}>
        <Text style={styles.authNavigationText}>
          {isSignUp ? 'Already have an account?' : "Don't have an Account?"}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setIsSignUp((prev) => !prev);
            handleResetState();
          }}
        >
          <Text style={styles.authNavigationBtnText}>{isSignUp ? 'Login' : 'Create Account'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContiner: {
    marginTop: 30,
  },
  titleText: { fontSize: 25 },
  subTitleText: { fontSize: 15, color: '#868686', marginTop: 5 },

  inputsContainer: {
    marginTop: 40,
    flexDirection: 'column',
    gap: 25,
  },

  createAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 30,
    backgroundColor: '#124BCD',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  createAccountButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  authNavigation: {
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  authNavigationText: {
    fontSize: 15,
    color: '#000',
  },
  authNavigationBtnText: {
    fontSize: 15,
    color: '#124BCD',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
