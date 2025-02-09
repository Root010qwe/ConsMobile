import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OneService(props) {
    const { id, name, description, image_url, price, duration } = props;
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Подробнее', { id });
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            {image_url ? (
                <Image source={{ uri: image_url }} style={styles.image} />
            ) : (
                <Image source={require('./default.png')} style={styles.image} />
            )}
            <View style={styles.body}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.text} numberOfLines={2}>
                    {description}
                </Text>
                <View style={styles.metaContainer}>
                    <Text style={styles.metaText}>{price ? `${price} ₽` : '-'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: 288, // ≈18rem
        marginBottom: 50,
        backgroundColor: 'rgba(30,32,50,0.7)', // var(--card-bg)
        borderWidth: 1,
        borderColor: 'rgba(13,110,253,0.42)', // приближённое значение var(--card-border-color)
        borderRadius: 10,
        overflow: 'hidden',
        // Тень для iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        // Elevation для Android
        elevation: 5,
        // Эффект «наведения» (hover) в веб и transition не поддерживаются напрямую 
        // – их можно реализовать через Animated API при необходимости
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        // Свойство transition не поддерживается в React Native
    },
    body: {
        padding: 15,
        flex: 1,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff', // var(--text-color)
    },
    text: {
        fontSize: 14,
        marginBottom: 15,
        color: '#fff',
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    metaText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
    },
});
