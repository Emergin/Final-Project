// StudentNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StudentDashboard from '../screens/Student/StudentDashboard';
import UpdateProfile from '../screens/Student/UpdateProfile';
import AddLogbookEntry from '../screens/Student/AddLogbookEntry';
import ViewLogbook from '../screens/Student/ViewLogbook';

const Stack = createStackNavigator();

const StudentNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="StudentDashboard">
      <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="AddLogbookEntry" component={AddLogbookEntry} />
      <Stack.Screen name="ViewLogbook" component={ViewLogbook} />
    </Stack.Navigator>
  );
};

export default StudentNavigator;
