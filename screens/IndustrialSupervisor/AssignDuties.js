// /home/trubel/Desktop/dekutattachment-app/screens/IndustrialSupervisor/AssignDuties.js
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AssignDuties = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign Duties</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter duties here"
        multiline
      />
      <Button title="Assign" onPress={() => alert('Duties Assigned')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
});

export default AssignDuties;
