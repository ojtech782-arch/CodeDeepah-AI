import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { Audio, Video } from 'expo-av';
import axios from 'axios';
import { API_URL } from '../config/env';

export async function recordAudioAsync(options = { durationMillis: 60000 }) {
  await Audio.requestPermissionsAsync();
  await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
  const recording = new Audio.Recording();
  await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
  await recording.startAsync();
  // Caller must stop and unload when done
  return recording;
}

export async function uploadFile(uri: string, fieldName = 'file') {
  const form = new FormData();
  const fileInfo = await FileSystem.getInfoAsync(uri);
  form.append(fieldName, {
    uri,
    name: uri.split('/').pop() || 'upload',
    type: 'application/octet-stream',
  } as any);

  const res = await fetch(`${API_URL}/upload`, { method: 'POST', body: form });
  return await res.json();
}
