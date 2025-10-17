import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { upgradeAccount } from '../store/slices/authSlice';

const AccountUpgrade = () => {
    const dispatch = useDispatch();

    const handleUpgrade = () => {
        // Dispatch action to upgrade account
        dispatch(upgradeAccount());
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upgrade Your Account</Text>
            <Text style={styles.description}>
                Unlock new features and benefits by upgrading your account.
            </Text>
            <Button title="Upgrade Now" onPress={handleUpgrade} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#E0F7FA', // Light blue background
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00796B', // Darker blue for title
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
        color: '#004D40', // Even darker blue for description
    },
});

export default AccountUpgrade;