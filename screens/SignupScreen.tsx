import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../App';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signup = () => {
    if (!username || !email.includes('@') || password.length < 6) {
      setError('Sign up gagal');
      return;
    }
    if (email.includes('taken')) {
      setError('Email sudah terdaftar');
      return;
    }
    setError('');
    navigation.navigate('Login');
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={{ borderWidth: 1, padding: 10, borderRadius: 6 }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 10, borderRadius: 6 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, padding: 10, borderRadius: 6 }} />
      <TouchableOpacity onPress={signup} style={{ backgroundColor: '#2ecc71', padding: 12, borderRadius: 6 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}