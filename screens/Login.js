import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button
        title="Login as SuperAdmin"
        onPress={() => navigation.navigate('SuperAdminForm')}
        color="#4CAF50"
      />
      <Button
        title="Login as School Supervisor"
        onPress={() => navigation.navigate('SchoolSupervisorForm')}
        color="#4CAF50"
      />
      <Button
        title="Login as Industrial Supervisor"
        onPress={() => navigation.navigate('IndustrialSupervisorForm')}
        color="#4CAF50"
      />
      <Button
        title="Login as Student"
        onPress={() => navigation.navigate('StudentForm')}
        color="#4CAF50"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Login;
