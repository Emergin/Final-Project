// ChooseRole.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

function ChooseRole({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Choose Login Role</Text>
      <Button title="Login as SuperAdmin" onPress={() => navigation.navigate('SuperAdminForm')} />
      <Button title="Login as School Supervisor" onPress={() => navigation.navigate('SchoolSupervisorForm')} />
      <Button title="Login as Industrial Supervisor" onPress={() => navigation.navigate('IndustrialSupervisorForm')} />
      <Button title="Login as Student" onPress={() => navigation.navigate('StudentForm')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChooseRole;
