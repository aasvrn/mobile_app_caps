import React, { useEffect, useLayoutEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { FavoriteContext, TabParamList, RootStackParamList } from '../App';

type Item = { id: number; title: string; price: number; description: string; image: string };

type HomeNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavProp>();
  const [items, setItems] = useState<Item[]>([]);
  const { favorites, toggleFavorite } = useContext(FavoriteContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings" size={22} />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products').then(r => r.json()).then(setItems);
  }, []);

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.id, title: item.title })} style={{ padding: 12, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Image source={{ uri: item.image }} style={{ width: 48, height: 48 }} />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1}>{item.title}</Text>
        <Text>${item.price}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Ionicons name={favorites.includes(item.id) ? 'heart' : 'heart-outline'} size={22} color={favorites.includes(item.id) ? 'red' : 'black'} />
      </TouchableOpacity>
      <Ionicons name="chevron-forward" size={22} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList data={items} keyExtractor={(i: Item) => String(i.id)} renderItem={renderItem} />
    </View>
  );
}