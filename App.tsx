import 'react-native-gesture-handler';
import React, { useEffect, useMemo, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import SettingsScreen from './screens/SettingsScreen';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Detail: { id: number; title: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type TabParamList = {
  Home: undefined;
  Favorites: undefined;
  Settings: undefined;
};

export type FavoriteContextType = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
};

export const FavoriteContext = React.createContext<FavoriteContextType>({ favorites: [], toggleFavorite: () => {} });

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <AuthStack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
    </AuthStack.Navigator>
  );
}

function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }: { route: { name: keyof TabParamList } }) => ({
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          const icon = route.name === 'Home' ? 'home' : route.name === 'Favorites' ? 'heart' : 'settings';
          return <Ionicons name={icon as any} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: () => <Text style={{ fontWeight: 'bold' }}>MyApp</Text> }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('favorites').then((v: string | null) => {
      if (v) setFavorites(JSON.parse(v));
    });
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      AsyncStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  };

  const ctx = useMemo(() => ({ favorites, toggleFavorite }), [favorites]);

  return (
    <FavoriteContext.Provider value={ctx}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#fff' }}>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootStack.Navigator>
              <RootStack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
              <RootStack.Screen name="Main" component={TabsNavigator} options={({ navigation }: { navigation: any }) => ({
                headerRight: () => (
                  <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: 1, title: 'Sample' })}>
                    <Ionicons name="navigate" size={22} />
                  </TouchableOpacity>
                ),
                title: 'Main'
              })} />
              <RootStack.Screen name="Detail" component={DetailScreen} options={({ route }: { route: any }) => ({ title: route.params.title })} />
            </RootStack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </FavoriteContext.Provider>
  );
}