import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WeatherInfo = ({ weatherData }) => {
  const { dt_txt, main, weather } = weatherData;
  const [details] = weather;

  return (
    <View style={styles.card}>
      <Text style={styles.date}>{new Date(dt_txt).toDateString()}</Text>
      <Image
        style={styles.icon}
        source={{
          uri: `https://openweathermap.org/img/wn/${details.icon}@2x.png`,
        }}
      />
      <Text style={styles.temp}>{main.temp}°C</Text>
      <Text style={styles.description}>{details.description}</Text>
    </View>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    elevation: 3,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  temp: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  description: {
    fontSize: 16,
    textTransform: 'capitalize',
  },
});
