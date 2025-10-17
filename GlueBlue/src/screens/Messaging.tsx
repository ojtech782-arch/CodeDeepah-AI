import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getSocket, initSocket } from '../services/socket';
import SmartReplies from '../components/SmartReplies';
import FilePreview from '../components/FilePreview';
import { recordAudioAsync, uploadFile } from '../services/media';
import { encryptMessage, decryptMessage } from '../services/crypto';
import { LucideIcons } from '../components/LucideIcons';

const Messaging = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socket = useSocket();

    useEffect(() => {
        const s = getSocket();
        s.on('receive_message', async (newMessage) => {
                // If message is encrypted, attempt decrypt (assumes senderPublicKey and our secretKey are available)
                try {
                    if (newMessage.ciphertext) {
                        // NOTE: server must provide senderPublicKey and nonce along with ciphertext
                        const decrypted = decryptMessage(newMessage.ciphertext, newMessage.nonce, newMessage.senderPublicKey, /* receiver secret key from secure store */ newMessage.receiverSecretKey || '');
                        newMessage.text = decrypted;
                    }
                } catch (e) {
                    console.warn('decrypt failed', e);
                }
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                // SoundPlayer.playMessageSound();
            });

        return () => {
            socket.off('receive_message');
        };
    }, [socket]);

    const sendMessage = async () => {
        if (!message.trim()) return;
        const s = getSocket();
        // Example: encrypt message for a single recipient (server should manage per-recipient encryption)
        const encrypted = encryptMessage(message.trim(), /* receiverPublicBase64 */ '', /* senderSecretBase64 */ '');
        const payload = { ciphertext: encrypted.ciphertext, nonce: encrypted.nonce, meta: { type: 'text' } };
        s.emit('send_message', payload);
        setMessage('');
    };

    const onRecordAudio = async () => {
        try {
            const recording = await recordAudioAsync();
            // stop after a short time for demo
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            if (uri) {
                const upload = await uploadFile(uri);
                getSocket().emit('send_message', { attachment: upload, meta: { type: 'audio' } });
            }
        } catch (e) { console.warn('record failed', e); }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageText}>{item}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.messageList}
            />
            <View style={styles.inputContainer}>
                <LucideIcons.MessageCircle size={24} />
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Type a message"
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F7FA',
        padding: 10,
    },
    messageList: {
        flex: 1,
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#B2EBF2',
        borderRadius: 10,
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#B2EBF2',
        borderRadius: 5,
        padding: 10,
        marginHorizontal: 5,
    },
});

export default Messaging;