import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { FavoriteContext } from '../App';

type Item = { id: number; title: string; image: string };

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useContext(FavoriteContext);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    Promise.all(favorites.map(id => fetch(`https://fakestoreapi.com/products/${id}`).then(r => r.json()))).then(setItems);
  }, [favorites]);

  if (favorites.length === 0) return <View style={{ padding: 16 }}><Text>Tidak ada favorit</Text></View>;

  const renderItem = ({ item }: { item: Item }) => (
    <View style={{ padding: 12, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Image source={{ uri: item.image }} style={{ width: 48, height: 48 }} />
      <Text style={{ flex: 1 }} numberOfLines={1}>{item.title}</Text>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Text>Hapus</Text>
      </TouchableOpacity>
    </View>
  );

  return <FlatList data={items} keyExtractor={i => String(i.id)} renderItem={renderItem} />;
}