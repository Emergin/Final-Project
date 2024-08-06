import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

const Stack = createStackNavigator();

// function ChooseRole({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text>Choose Login Role</Text>
//       <Button title="Login as SuperAdmin" onPress={() => navigation.navigate('SuperAdminForm')} />
//       <Button title="Login as School Supervisor" onPress={() => navigation.navigate('SchoolSupervisorForm')} />
//       <Button title="Login as Industrial Supervisor" onPress={() => navigation.navigate('IndustrialSupervisorForm')} />
//       <Button title="Login as Student" onPress={() => navigation.navigate('StudentForm')} />
//     </View>
//   );
// }

function App() {
  return <AppNavigator />;
}

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

export default App;
