import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { axiosInstance } from '../API';
import { setServices } from '../store/cardSlice';
import OneService from '../components/OneCard';
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { services } = useSelector((store) => store.service);
  const [searchQuery, setSearchQuery] = useState('');

  async function getAllServices() {
    try {
      const response = await axiosInstance.get('/services/');
      const data = response.data.results || response.data;
      dispatch(setServices(data.services));
    } catch (error) {
      console.error('Ошибка при запросе axios:', error);
    }
  }

  useEffect(() => {
    getAllServices();
  }, [dispatch]);

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      getAllServices();
    } else {
      try {
        const response = await axiosInstance.get(`/services/?name=${searchQuery}`);
        const data = response.data.results || response.data;
        dispatch(setServices(data.services));
      } catch (error) {
        console.error('Ошибка при поиске:', error);
      }
    }
  };

  const handleBasketClick = () => {
    navigation.navigate('Basket');
  };

  return (
    <View style={styles.page}>
      <Text style={styles.pageTitle}>Услуги</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Введите название услуги"
          placeholderTextColor="#ccc"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Поиск</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {services &&
          services.map((service) => (
            <OneService
              key={service.id}
              id={service.id}
              name={service.name}
              description={service.description}
              image_url={service.image_url}
              price={service.price}

            />
          ))}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: '#10111b'
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '600',
    color: '#0d6efd',
    textShadowColor: 'rgba(88,103,221,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 2,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingLeft: 65,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#0d6efd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(30,32,50,0.7)',
    color: '#fff',
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: 'rgba(30,32,50,0.7)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#0d6efd',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  basketButton: {
    position: 'absolute',
    right: 30,
    top: 90,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(30,32,50,0.7)',
    borderWidth: 1,
    borderColor: '#0d6efd',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  basketButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});
