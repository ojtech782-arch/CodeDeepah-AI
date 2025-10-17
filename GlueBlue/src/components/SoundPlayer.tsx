import React, { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const SoundPlayer = ({ soundFile }) => {
  const sound = useRef(new Audio.Sound());

  useEffect(() => {
    const loadSound = async () => {
      try {
        await sound.current.loadAsync(require(`../../assets/sounds/${soundFile}`));
      } catch (error) {
        console.error('Error loading sound:', error);
      }
    };

    loadSound();

    return () => {
      sound.current.unloadAsync();
    };
  }, [soundFile]);

  const playSound = async () => {
    try {
      await sound.current.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  return (
    <button onClick={playSound}>
      Play Sound
    </button>
  );
};

export default SoundPlayer;