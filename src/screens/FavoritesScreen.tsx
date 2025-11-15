import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Item = { id: number; title?: string; name?: string };

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Item[]>([]);

  const load = async () => {
    const j = await AsyncStorage.getItem('favorites');
    setFavorites(j ? JSON.parse(j) : []);
  };

  useEffect(() => {
    const unsub = setInterval(load, 500);
    return () => clearInterval(unsub);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(x) => String(x.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text>{item.title || item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 24 }}>No favorites yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  card: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee' }
});