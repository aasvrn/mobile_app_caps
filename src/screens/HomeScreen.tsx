import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

type Item = { id: number; title?: string; name?: string; image?: string; description?: string };

export default function HomeScreen() {
  const nav = useNavigation<any>();
  const { user, logout } = useAuth();
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(r => r.json())
      .then((list: any[]) => setItems(list.map(x => ({ id: x.id, title: x.title, image: x.image, description: x.description }))))
      .catch(() => setItems([{ id: 1, title: 'Sample Item', image: 'https://placehold.co/100x100', description: 'Offline item' }]));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://placehold.co/48x48?text=MC' }} style={styles.logo} />
        <Text style={styles.headerText}>Welcome {user?.username}</Text>
        <TouchableOpacity onPress={() => nav.navigate('SettingsMenu')} style={styles.settingsIcon}>
          <Text style={{ fontSize: 18 }}>⚙️</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={(x) => String(x.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => nav.navigate('Detail', { item })}>
            <Image source={{ uri: item.image || 'https://placehold.co/100x100' }} style={styles.itemImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title || item.name}</Text>
              <Text numberOfLines={2} style={styles.subtitle}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#f5f5f5' },
  headerText: { marginLeft: 12, fontSize: 16, flex: 1 },
  logo: { width: 32, height: 32, borderRadius: 6 },
  settingsIcon: { paddingHorizontal: 8 },
  card: { flexDirection: 'row', padding: 12, borderBottomColor: '#eee', borderBottomWidth: 1 },
  itemImage: { width: 56, height: 56, marginRight: 12, borderRadius: 6 },
  title: { fontWeight: '600' },
  subtitle: { color: '#666', marginTop: 4 },
  logout: { position: 'absolute', right: 16, bottom: 24, backgroundColor: '#e74c3c', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  logoutText: { color: '#fff', fontWeight: '600' }
});