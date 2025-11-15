import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthStackParamList } from '../App';

type Props = StackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = () => {
    if (!email.includes('@') || password.length < 6) {
      setError('Login gagal');
      return;
    }
    setError('');
    navigation.getParent()?.navigate('Main');
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, padding: 10, borderRadius: 6 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, padding: 10, borderRadius: 6 }} />
      <TouchableOpacity onPress={login} style={{ backgroundColor: '#2e86de', padding: 12, borderRadius: 6 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}