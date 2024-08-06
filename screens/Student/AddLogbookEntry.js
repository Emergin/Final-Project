// /home/trubel/Desktop/dekutattachment-app/screens/Student/AddLogbookEntry.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import config from '../../config';

const AddLogbookEntry = ({ route, navigation }) => {
  const { studentId } = route.params;  // Ensure studentId is passed correctly
  const [day, setDay] = useState('');
  const [activity, setActivity] = useState('');
  const [benefit, setBenefit] = useState('');
  const [supervisorActivity, setSupervisorActivity] = useState('');
  const [month, setMonth] = useState('');
  const [week, setWeek] = useState('');

  const handleAddEntry = async () => {
    try {
      await axios.post(`http://${config.ipAddress}:3000/logbook/entry`, {
        studentId,
        day,
        activity,
        benefit,
        supervisorActivity,
        month,
        week
      });
      alert('Logbook entry added successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Logbook entry error:', error);
      alert('Logbook entry failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add Logbook Entry</Text>
      <TextInput placeholder="Day" value={day} onChangeText={setDay} style={styles.input} />
      <TextInput placeholder="Activity" value={activity} onChangeText={setActivity} style={styles.input} />
      <TextInput placeholder="Benefit" value={benefit} onChangeText={setBenefit} style={styles.input} />
      <TextInput placeholder="Supervisor Activity" value={supervisorActivity} onChangeText={setSupervisorActivity} style={styles.input} />
      <TextInput placeholder="Month" value={month} onChangeText={setMonth} style={styles.input} />
      <TextInput placeholder="Week" value={week} onChangeText={setWeek} style={styles.input} />
      <Button title="Add Entry" onPress={handleAddEntry} />
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

export default AddLogbookEntry;
