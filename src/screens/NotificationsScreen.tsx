import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function NotificationsScreen() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    Notifications.requestPermissionsAsync().then(({ status }) => setStatus(status));
  }, []);

  const schedule = async () => {
    await Notifications.scheduleNotificationAsync({
      content: { title: 'Test Alert', body: 'Notification triggered' },
      trigger: null
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.info}>Permission: {status || 'unknown'}</Text>
      <TouchableOpacity style={styles.button} onPress={schedule}>
        <Text style={styles.buttonText}>Trigger Test Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  info: { marginBottom: 12 },
  button: { backgroundColor: '#2e86de', padding: 14, borderRadius: 8 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600' }
});