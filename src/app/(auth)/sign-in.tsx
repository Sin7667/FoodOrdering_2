import { Text, TextInput, View, StyleSheet } from 'react-native';
import Button from '@/components/Button';
import { useState } from "react";
import React from "react";
import Colors from '@/constants/Colors';
import { Link, Stack } from 'expo-router';

const createSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Sign In' }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="jon@gmail.com"
                style={styles.input}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
                style={styles.input}
            />
            <Button text="Sign in" />
            <Link href="/sign-up" style={styles.textButton}>
                Create an account
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        color: Colors.light.tint,
    },
});

export default createSignIn;