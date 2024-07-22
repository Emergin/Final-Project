import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';

const UpdateProfile = ({ route, navigation }) => {
  const { studentId } = route.params;
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [regno, setRegno] = useState('');
  const [course, setCourse] = useState('');
  const [company, setCompany] = useState('');
  const [county, setCounty] = useState('');
  const [subcounty, setSubcounty] = useState('');
  const [coordinates, setCoordinates] = useState('');

  const handleUpdateProfile = async () => {
    try {
      await axios.post('http://192.168.43.102:3000/update/student', {
        studentId,
        firstname,
        lastname,
        regno,
        course,
        company,
        county,
        subcounty,
        coordinates,
      });
      navigation.navigate('StudentDashboard', { studentId });
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Profile update failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Update Profile</Text>
      <TextInput placeholder="First Name" value={firstname} onChangeText={setFirstname} style={styles.input} />
      <TextInput placeholder="Last Name" value={lastname} onChangeText={setLastname} style={styles.input} />
      <TextInput placeholder="Registration Number" value={regno} onChangeText={setRegno} style={styles.input} />
      <TextInput placeholder="Course" value={course} onChangeText={setCourse} style={styles.input} />
      <TextInput placeholder="Company" value={company} onChangeText={setCompany} style={styles.input} />
      <TextInput placeholder="County" value={county} onChangeText={setCounty} style={styles.input} />
      <TextInput placeholder="Sub County" value={subcounty} onChangeText={setSubcounty} style={styles.input} />
      <TextInput placeholder="Coordinates" value={coordinates} onChangeText={setCoordinates} style={styles.input} />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
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

export default UpdateProfile;
