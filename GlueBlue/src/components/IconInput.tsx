import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LucideIcon } from './LucideIcons'; // Assuming LucideIcons exports the necessary icons

const IconInput = ({ icon, placeholder, secureTextEntry, onChangeText, value }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <LucideIcon name={icon} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={!isPasswordVisible}
        onChangeText={onChangeText}
        value={value}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
          <LucideIcon name={isPasswordVisible ? 'eye-off' : 'eye'} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B0C4DE', // Light steel blue color for "GlueBlue" theme
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
    color: '#4682B4', // Steel blue color for "GlueBlue" theme
  },
  toggleButton: {
    padding: 5,
  },
});

export default IconInput;