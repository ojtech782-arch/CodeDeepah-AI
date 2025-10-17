import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

export default function SmartReplies({ suggestions = [], onPick }: { suggestions?: string[]; onPick: (s: string) => void }) {
  if (!suggestions || !suggestions.length) return null;
  return (
    <View style={styles.container}>
      {suggestions.map((s, i) => (
        <TouchableOpacity key={i} style={styles.pill} onPress={() => onPick(s)}>
          <Text numberOfLines={1} style={styles.text}>{s}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', padding: 8 },
  pill: { backgroundColor: '#eaf4ff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 18, marginRight: 8 },
  text: { color: colors.text, maxWidth: 220 },
});
