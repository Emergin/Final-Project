import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const SuperAdminDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Add Students" onPress={() => navigation.navigate('AddStudents')} />
      <Button title="Add Supervisors" onPress={() => navigation.navigate('AddSupervisors')} />
      <Button title="Assign Students" onPress={() => navigation.navigate('AssignStudents')} />
      <Button title="View Students" onPress={() => navigation.navigate('ViewStudents')} />
      <Button title="View Supervisors" onPress={() => navigation.navigate('ViewSupervisors')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
});

export default SuperAdminDashboard;
