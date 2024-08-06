// /home/trubel/Desktop/dekutattachment-app/screens/SchoolSupervisor/SchoolSupervisorDashboard.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SchoolSupervisorDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>School Supervisor Dashboard</Text>
      <Button
        title="View Assigned Students"
        onPress={() => navigation.navigate('ViewAssignedStudents')}
      />
      <Button
        title="Student Logbook"
        onPress={() => navigation.navigate('StudentLogbook')}
      />
      <Button
        title="Leave Comments"
        onPress={() => navigation.navigate('LeaveComments')}
      />
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
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default SchoolSupervisorDashboard;
