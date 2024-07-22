// /home/trubel/Desktop/dekutattachment-app/navigation/SchoolSupervisorNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SchoolSupervisorDashboard from '../screens/SchoolSupervisor/SchoolSupervisorDashboard';
import ViewAssignedStudents from '../screens/SchoolSupervisor/ViewAssignedStudents';
import LeaveComments from '../screens/SchoolSupervisor/LeaveComments';
import StudentLogbook from '../screens/SchoolSupervisor/StudentLogbook';
import ViewLogbooks from '../screens/ViewLogbooks';

const Stack = createStackNavigator();

const SchoolSupervisorNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SchoolSupervisorDashboard">
      <Stack.Screen name="SchoolSupervisorDashboard" component={SchoolSupervisorDashboard} />
      <Stack.Screen name="ViewAssignedStudents" component={ViewAssignedStudents} />
      <Stack.Screen name="LeaveComments" component={LeaveComments} />
      <Stack.Screen name="StudentLogbook" component={StudentLogbook} />
      <Stack.Screen name="ViewLogbooks" component={ViewLogbooks} />
    </Stack.Navigator>
  );
};

export default SchoolSupervisorNavigator;
