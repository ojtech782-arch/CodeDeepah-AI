import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native'; // Assuming you're using Lucid icons

const PasswordToggle = ({ value, onChange, placeholder }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry={!isPasswordVisible}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
        {isPasswordVisible ? <EyeOff /> : <Eye />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    padding: 5,
  },
});

export default PasswordToggle;