import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function ApiIntegrationScreen() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
      .then(r => r.json())
      .then(setData)
      .catch(() => setError('Failed to fetch API'));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Integration</Text>
      {!!error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={data}
        keyExtractor={(x) => String(x.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardBody}>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  error: { color: 'red', marginBottom: 12 },
  card: { padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginBottom: 12 },
  cardTitle: { fontWeight: '600', marginBottom: 4 },
  cardBody: { color: '#555' }
});