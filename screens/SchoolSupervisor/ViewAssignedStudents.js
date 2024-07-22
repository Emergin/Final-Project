// /home/trubel/Desktop/dekutattachment-app/screens/SchoolSupervisor/ViewAssignedStudents.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ViewAssignedStudents = () => {
  // Placeholder data for students
  const students = [
    { id: '1', name: 'Student 1' },
    { id: '2', name: 'Student 2' },
    { id: '3', name: 'Student 3' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assigned Students</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <Text>{item.name}</Text>
          </View>
        )}
      />
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
  studentItem: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
    borderRadius: 4,
  },
});

export default ViewAssignedStudents;
