import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import * as Sharing from 'expo-sharing';

export default function FilePreview({ file }: { file: { uri: string; name?: string; type?: string } }) {
  const isImage = file.type?.startsWith('image') || /\.(jpg|jpeg|png|gif)$/i.test(file.name || '');

  async function share() {
    if (!(await Sharing.isAvailableAsync())) return;
    try { await Sharing.shareAsync(file.uri); } catch (e) { console.warn('share error', e); }
  }

  return (
    <View style={{ padding: 8 }}>
      {isImage ? <Image source={{ uri: file.uri }} style={{ width: 160, height: 120, borderRadius: 8 }} /> : <Text>{file.name || 'File'}</Text>}
      <TouchableOpacity onPress={share} style={{ marginTop: 6 }}>
        <Text style={{ color: '#0B72FF' }}>Share / Open</Text>
      </TouchableOpacity>
    </View>
  );
}
