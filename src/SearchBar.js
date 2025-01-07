import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

const SearchBar = ({ onSubmit }) => {
  const [city, setCity] = useState('');

  const handlePress = () => {
    if (city.trim()) {
      onSubmit(city);
      setCity('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={(text) => setCity(text)}
      />
      <Button title="Search" onPress={handlePress} />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
    height: 40,
  },
});
