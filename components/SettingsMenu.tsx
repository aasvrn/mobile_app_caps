import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Item = { key: string; title: string; onPress: () => void };

export default function SettingsMenu({ items }: { items: Item[] }) {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      {items.map(i => (
        <TouchableOpacity key={i.key} onPress={i.onPress} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Ionicons name="chevron-forward" size={20} />
          <Text style={{ fontSize: 16 }}>{i.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}