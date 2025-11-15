import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Platform } from 'react-native';
import { getPermissionsAsync, requestPermissionsAsync, scheduleNotificationAsync, IosAuthorizationStatus } from '../lib/notifications';
import SettingsMenu from '../components/SettingsMenu';

export default function SettingsScreen() {
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      setPermission(true);
      return;
    }
    getPermissionsAsync().then((r: any) => setPermission(r.granted || r.ios?.status === IosAuthorizationStatus.PROVISIONAL));
  }, []);

  const request = async () => {
    if (Platform.OS === 'web') {
      setPermission(true);
      Alert.alert('Notifikasi', 'Diizinkan');
      return;
    }
    const r = await requestPermissionsAsync();
    setPermission(r.granted || r.ios?.status === IosAuthorizationStatus.PROVISIONAL);
    Alert.alert('Notifikasi', permission ? 'Diizinkan' : 'Ditolak');
  };

  const trigger = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Notifikasi', 'Berhasil memicu notifikasi');
      return;
    }
    await scheduleNotificationAsync({
      content: { title: 'Tes Notifikasi', body: 'Berhasil memicu notifikasi' },
      trigger: { seconds: 1 }
    });
  };

  const items = [
    { key: 'notif-config', title: 'Konfigurasi Notifikasi', onPress: request },
    { key: 'notif-test', title: 'Uji Notifikasi', onPress: trigger },
    { key: 'about', title: 'Tentang Aplikasi', onPress: () => Alert.alert('Info', 'MobileAppCaps') }
  ];

  return (
    <View style={{ flex: 1 }}>
      <SettingsMenu items={items} />
      <View style={{ padding: 16 }}>
        <Text>Status izin: {permission ? 'Diizinkan' : 'Belum'}</Text>
        <TouchableOpacity onPress={request} style={{ backgroundColor: '#f1c40f', padding: 10, borderRadius: 6, marginTop: 12 }}>
          <Text style={{ textAlign: 'center' }}>Minta Izin</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={trigger} style={{ backgroundColor: '#8e44ad', padding: 10, borderRadius: 6, marginTop: 12 }}>
          <Text style={{ textAlign: 'center', color: '#fff' }}>Kirim Notifikasi Tes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}