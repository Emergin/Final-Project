// /home/trubel/Desktop/dekutattachment-app/screens/IndustrialSupervisor/IndustrialSupervisorDashboard.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const IndustrialSupervisorDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Industrial Supervisor Dashboard</Text>
      <Button
        title="Assign Duties"
        onPress={() => navigation.navigate('AssignDuties')}
      />
      <Button
        title="View Student Logbook"
        onPress={() => navigation.navigate('ViewStudentLogbook')}
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

export default IndustrialSupervisorDashboard;
