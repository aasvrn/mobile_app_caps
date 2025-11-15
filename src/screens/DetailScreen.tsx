import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

export default function DetailScreen() {
  const route = useRoute<any>();
  const item = route.params?.item;
  const [fav, setFav] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('favorites').then(j => {
      const arr = j ? JSON.parse(j) as any[] : [];
      setFav(!!arr.find(x => x.id === item.id));
    });
  }, [item]);

  const toggleFav = async () => {
    const j = await AsyncStorage.getItem('favorites');
    const arr = j ? JSON.parse(j) as any[] : [];
    let next;
    if (fav) next = arr.filter(x => x.id !== item.id);
    else next = [...arr, item];
    await AsyncStorage.setItem('favorites', JSON.stringify(next));
    setFav(!fav);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image || 'https://placehold.co/300x200' }} style={styles.image} />
      <Text style={styles.title}>{item.title || item.name}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <TouchableOpacity style={styles.action} onPress={toggleFav}>
        <Text style={styles.actionText}>{fav ? 'Remove Favorite' : 'Add Favorite'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: '100%', height: 220, borderRadius: 12, marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '600' },
  desc: { color: '#555', marginTop: 6 },
  action: { marginTop: 16, backgroundColor: '#27ae60', padding: 12, borderRadius: 8 },
  actionText: { color: '#fff', textAlign: 'center', fontWeight: '600' }
});