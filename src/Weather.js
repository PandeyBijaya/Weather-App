import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import WeatherInfo from './WeatherInfo';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const API_KEY = '83a92f92f24ae7f1b612e10022065830';

const Weather = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [city, setCity] = useState('Arlington');

  // Function to fetch 3-day weather data
  const fetchWeatherData = async (cityName) => {
    try {
      setLoaded(false);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (response.status === 200) {
        const data = await response.json();

        // Filter data for the next 3 days at the same time
        const dailyData = data.list.filter((item, index) => index % 8 === 0);
        setWeatherData(dailyData.slice(0, 3));
      } else {
        setWeatherData([]);
        Alert.alert('Error', 'City not found!');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  if (!loaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <TouchableOpacity style={styles.button} onPress={() => fetchWeatherData(city)}>
          <MaterialCommunityIcons name="magnify" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={weatherData}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => <WeatherInfo weatherData={item} />}
      />
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
});
