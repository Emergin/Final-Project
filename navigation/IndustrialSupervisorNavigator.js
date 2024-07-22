// /home/trubel/Desktop/dekutattachment-app/navigation/IndustrialSupervisorNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IndustrialSupervisorDashboard from '../screens/IndustrialSupervisor/IndustrialSupervisorDashboard';
import AssignDuties from '../screens/IndustrialSupervisor/AssignDuties';
import ViewStudentLogbook from '../screens/IndustrialSupervisor/ViewStudentLogbook';
import LeaveComments from '../screens/IndustrialSupervisor/LeaveComments';
import ViewLogbooks from '../screens/ViewLogbooks';

const Stack = createStackNavigator();

const IndustrialSupervisorNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="IndustrialSupervisorDashboard">
      <Stack.Screen name="IndustrialSupervisorDashboard" component={IndustrialSupervisorDashboard} />
      <Stack.Screen name="AssignDuties" component={AssignDuties} />
      <Stack.Screen name="ViewStudentLogbook" component={ViewStudentLogbook} />
      <Stack.Screen name="LeaveComments" component={LeaveComments} />
      <Stack.Screen name="ViewLogbooks" component={ViewLogbooks} />
    </Stack.Navigator>
  );
};

export default IndustrialSupervisorNavigator;
