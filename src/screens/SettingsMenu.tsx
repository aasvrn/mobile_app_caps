import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SettingsMenu() {
  const nav = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Menu</Text>
      <TouchableOpacity style={styles.item} onPress={() => nav.navigate('Settings')}>
        <Text>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => nav.navigate('Notifications')}>
        <Text>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={() => nav.navigate('API')}>
        <Text>External API</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  item: { padding: 16, borderBottomColor: '#eee', borderBottomWidth: 1 }
});