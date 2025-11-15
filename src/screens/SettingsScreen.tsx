import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [dark, setDark] = useState(false);
  const [notify, setNotify] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('settings').then(j => {
      const s = j ? JSON.parse(j) : { dark: false, notify: true };
      setDark(!!s.dark);
      setNotify(!!s.notify);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('settings', JSON.stringify({ dark, notify }));
  }, [dark, notify]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Dark mode</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Notifications</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  label: { fontSize: 16 }
});