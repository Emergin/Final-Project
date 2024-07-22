import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const SchoolSupervisorForm = () => {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    phonenumber: '',
    nationalId: ''
  });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        onChangeText={(value) => handleChange('firstname', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        onChangeText={(value) => handleChange('lastname', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        onChangeText={(value) => handleChange('phonenumber', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="National ID"
        onChangeText={(value) => handleChange('nationalId', value)}
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default SchoolSupervisorForm;
