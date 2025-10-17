import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LucideIcons } from '../components/LucideIcons';
import { DashboardCard } from '../components/DashboardCard';

const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to GlueBlue</Text>
            <View style={styles.dashboard}>
                <DashboardCard />
                <DashboardCard />
                <DashboardCard />
            </View>
            <View style={styles.footer}>
                <LucideIcons name="home" size={24} onPress={() => navigation.navigate('Home')} />
                <LucideIcons name="message-circle" size={24} onPress={() => navigation.navigate('Messaging')} />
                <LucideIcons name="bell" size={24} onPress={() => navigation.navigate('Notifications')} />
                <LucideIcons name="wallet" size={24} onPress={() => navigation.navigate('Wallet')} />
                <LucideIcons name="settings" size={24} onPress={() => navigation.navigate('Settings')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F7FA', // Light blue background
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00796B', // Darker blue for title
        marginBottom: 16,
    },
    dashboard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#B2EBF2', // Footer background color
    },
});

export default Home;