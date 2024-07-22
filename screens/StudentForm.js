import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const StudentForm = () => {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    regNo: '',
    course: '',
    company: '',
    county: '',
    subcounty: '',
    coordinates: ''
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
        placeholder="Registration Number"
        onChangeText={(value) => handleChange('regNo', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Course of Study"
        onChangeText={(value) => handleChange('course', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Company of Attachment"
        onChangeText={(value) => handleChange('company', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="County Location"
        onChangeText={(value) => handleChange('county', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Subcounty Location"
        onChangeText={(value) => handleChange('subcounty', value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Coordinates"
        onChangeText={(value) => handleChange('coordinates', value)}
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

export default StudentForm;
