import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const StudentDashboard = ({ route, navigation }) => {
  const { studentId } = route.params; // Get studentId from route params

  return (
    <View style={styles.container}>
      <Button title="Update Profile" onPress={() => navigation.navigate('UpdateProfile', { studentId })} />
      <Button title="Add Logbook Entry" onPress={() => navigation.navigate('AddLogbookEntry', { studentId })} />
      <Button title="View Logbook" onPress={() => navigation.navigate('ViewLogbook', { studentId })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StudentDashboard;
