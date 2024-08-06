import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import config from '../../config';

const SchoolSupervisorForm = ({ navigation }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [nationalId, setNationalId] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post(`http://${config.ipAddress}:3000/register/schoolsupervisor`, {
        firstname,
        lastname,
        phonenumber,
        nationalId,
      });
      navigation.navigate('SchoolSupervisorDashboard');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text>School Supervisor Registration</Text>
      <TextInput placeholder="First Name" value={firstname} onChangeText={setFirstname} style={styles.input} />
      <TextInput placeholder="Last Name" value={lastname} onChangeText={setLastname} style={styles.input} />
      <TextInput placeholder="Phone Number" value={phonenumber} onChangeText={setPhonenumber} style={styles.input} />
      <TextInput placeholder="National ID" value={nationalId} onChangeText={setNationalId} style={styles.input} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SchoolSupervisorForm;
