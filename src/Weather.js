import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import WeatherInfo from './WeatherInfo';
import SearchBar from './SearchBar';

const API_KEY = '83a92f92f24ae7f1b612e10022065830';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const fetchWeatherData = async (cityName) => {
    try {
      setLoaded(false);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      if (response.status === 200) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        setWeatherData(null);
        Alert.alert('Error', 'City not found!');
      }
    } catch (error) {
      setWeatherData(null);
      Alert.alert('Error', error.message);
    } finally {
      setLoaded(true);
    }
  };

  // Fetch weather data for Arlington on initial render
  useEffect(() => {
    fetchWeatherData('Arlington');
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar onSubmit={fetchWeatherData} />
      <WeatherInfo weatherData={weatherData} />
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
});
