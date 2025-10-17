import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleNotifications } from '../store/slices/notificationsSlice';
import { colors } from '../styles/colors';

const Settings = () => {
    const dispatch = useDispatch();
    const notificationsEnabled = useSelector(state => state.notifications.enabled);

    const handleToggleNotifications = () => {
        dispatch(toggleNotifications());
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Enable Notifications</Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={handleToggleNotifications}
                />
            </View>
            {/* Additional settings can be added here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    settingText: {
        fontSize: 18,
        color: colors.text,
    },
});

export default Settings;