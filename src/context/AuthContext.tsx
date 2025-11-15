import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = { id: string; username: string; email: string } | null;

type AuthContextType = {
  user: User;
  signup: (username: string, email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as any);

async function getUsers() {
  const json = await AsyncStorage.getItem('users');
  return json ? JSON.parse(json) as { email: string; password: string; username: string; id: string }[] : [];
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    AsyncStorage.getItem('currentUser').then(x => setUser(x ? JSON.parse(x) : null));
  }, []);

  const signup = async (username: string, email: string, password: string) => {
    const users = await getUsers();
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { ok: false, error: 'Email already registered' };
    const newUser = { id: String(Date.now()), username, email, password };
    const updated = [...users, newUser];
    await AsyncStorage.setItem('users', JSON.stringify(updated));
    const publicUser = { id: newUser.id, username: newUser.username, email: newUser.email };
    await AsyncStorage.setItem('currentUser', JSON.stringify(publicUser));
    setUser(publicUser);
    return { ok: true };
  };

  const login = async (email: string, password: string) => {
    const users = await getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return { ok: false, error: 'Invalid credentials' };
    const publicUser = { id: found.id, username: found.username, email: found.email };
    await AsyncStorage.setItem('currentUser', JSON.stringify(publicUser));
    setUser(publicUser);
    return { ok: true };
  };

  const logout = async () => {
    await AsyncStorage.removeItem('currentUser');
    setUser(null);
  };

  const value = useMemo(() => ({ user, signup, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}