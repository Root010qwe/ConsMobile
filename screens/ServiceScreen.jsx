import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';
import { resetService, setService } from '../store/cardSlice';
import { axiosInstance } from '../API';
import { useDispatch, useSelector } from 'react-redux';

export default function ServiceScreen({ route }) {
    const { id } = route.params;
    const dispatch = useDispatch();
    const { service } = useSelector((store) => store.service);

    useEffect(() => {
        async function getOneService() {
            try {
                const response = await axiosInstance.get(`/services/${id}/`);
                dispatch(setService(response.data));
            } catch (error) {
                console.error('Ошибка при запросе axios:', error);
            }
        }
        getOneService();
        return () => {
            dispatch(resetService());
        };
    }, [dispatch, id]);

    if (!service || !service.id) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Загрузка...</Text>
            </View>
        );
    }

    return (
        <View style={styles.page}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.card}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={service.image_url ? { uri: service.image_url } : require('../components/default.png')}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.title}>{service.name}</Text>
                        <Text style={styles.description}>{service.description}</Text>
                        <View style={styles.metaContainer}>
                            <View style={styles.metaItem}>
                                <Text style={styles.metaTitle}>Стоимость</Text>
                                <Text style={styles.metaValue}>{service.price ? `${service.price} ₽` : '-'}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Text style={styles.metaTitle}>Продолжительность</Text>
                                <Text style={styles.metaValue}>{service.duration ? `${service.duration} ч` : '-'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#10111b',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#10111b',
    },
    loadingText: {
        color: '#fff',
        fontSize: 18,
    },
    container: {
        padding: 20,
    },
    card: {
        backgroundColor: 'rgba(30,32,50,0.7)',
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(13,110,253,0.42)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 8,
        resizeMode: 'cover',
    },
    infoContainer: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    metaItem: {
        alignItems: 'center',
        flex: 1,
    },
    metaTitle: {
        fontSize: 16,
        color: '#0d6efd',
        marginBottom: 5,
    },
    metaValue: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff',
    },
}); 