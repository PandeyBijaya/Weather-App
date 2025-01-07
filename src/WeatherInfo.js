import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WeatherInfo = ({ weatherData }) => {
  if (!weatherData) return null;

  const { name, main, weather, wind } = weatherData;
  const { temp, humidity } = main;
  const { description, icon } = weather[0];

  return (
    <View style={styles.container}>
      <Text style={styles.city}>{name}</Text>
      <Image
        style={styles.icon}
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
      />
      <Text style={styles.description}>{description.toUpperCase()}</Text>
      <Text style={styles.temp}>{Math.round(temp)}°C</Text>
      <Text style={styles.info}>Humidity: {humidity}%</Text>
      <Text style={styles.info}>Wind Speed: {wind.speed} m/s</Text>
    </View>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 20,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  icon: {
    width: 100,
    height: 100,
  },
  description: {
    fontSize: 18,
    marginVertical: 5,
    textTransform: 'capitalize',
  },
  temp: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  info: {
    fontSize: 16,
    color: '#555',
  },
});
