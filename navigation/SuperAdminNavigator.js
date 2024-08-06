// /home/trubel/Desktop/dekutattachment-app/navigation/SuperAdminNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SuperAdminDashboard from '../screens/SuperAdmin/SuperAdminDashboard';
import AddStudents from '../screens/SuperAdmin/AddStudents';
import AddSupervisors from '../screens/SuperAdmin/AddSupervisors';
import AssignStudents from '../screens/SuperAdmin/AssignStudents';
import ViewStudents from '../screens/SuperAdmin/ViewStudents';
import ViewSupervisors from '../screens/SuperAdmin/ViewSupervisors';

const Stack = createStackNavigator();

const SuperAdminNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SuperAdminDashboard">
      <Stack.Screen name="SuperAdminDashboard" component={SuperAdminDashboard} />
      <Stack.Screen name="AddStudents" component={AddStudents} />
      <Stack.Screen name="AddSupervisors" component={AddSupervisors} />
      <Stack.Screen name="AssignStudents" component={AssignStudents} />
      <Stack.Screen name="ViewStudents" component={ViewStudents} />
      <Stack.Screen name="ViewSupervisors" component={ViewSupervisors} />
    </Stack.Navigator>
  );
};

export default SuperAdminNavigator;
