import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList, FavoriteContext } from '../App';
import { Ionicons } from '@expo/vector-icons';

type Props = StackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props) {
  const { id } = route.params;
  const [item, setItem] = useState<any>(null);
  const { favorites, toggleFavorite } = useContext(FavoriteContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`).then(r => r.json()).then(setItem);
  }, [id]);

  if (!item) return <View style={{ padding: 16 }}><Text>Loading</Text></View>;

  const fav = favorites.includes(item.id);

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Image source={{ uri: item.image }} style={{ width: 160, height: 160, alignSelf: 'center' }} />
      <Text style={{ fontSize: 18, fontWeight: '600' }}>{item.title}</Text>
      <Text>${item.price}</Text>
      <Text>{item.description}</Text>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Ionicons name={fav ? 'heart' : 'heart-outline'} size={22} color={fav ? 'red' : 'black'} />
        <Text>{fav ? 'Favorit' : 'Tambah ke Favorit'}</Text>
      </TouchableOpacity>
    </View>
  );
}