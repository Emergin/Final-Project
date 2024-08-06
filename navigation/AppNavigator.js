import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import SuperAdminForm from '../screens/SuperAdmin/SuperAdminForm';
import SchoolSupervisorForm from '../screens/SchoolSupervisor/SchoolSupervisorForm';
import IndustrialSupervisorForm from '../screens/IndustrialSupervisor/IndustrialSupervisorForm';
import StudentForm from '../screens/Student/StudentForm';
import SuperAdminDashboard from '../screens/SuperAdmin/SuperAdminDashboard';
import SchoolSupervisorDashboard from '../screens/SchoolSupervisor/SchoolSupervisorDashboard';
import IndustrialSupervisorDashboard from '../screens/IndustrialSupervisor/IndustrialSupervisorDashboard';
import StudentDashboard from '../screens/Student/StudentDashboard';
import AddStudents from '../screens/SuperAdmin/AddStudents';
import AddSupervisors from '../screens/SuperAdmin/AddSupervisors';
import AssignStudents from '../screens/SuperAdmin/AssignStudents';
import ViewStudents from '../screens/SuperAdmin/ViewStudents';
import ViewSupervisors from '../screens/SuperAdmin/ViewSupervisors';
import AddLogbookEntry from '../screens/Student/AddLogbookEntry';  // Ensure this is imported
import ViewLogbook from '../screens/Student/ViewLogbook';
import UpdateProfile from '../screens/Student/UpdateProfile';
import IndustrialSupervisorViewLogbook from '../screens/IndustrialSupervisor/ViewStudentLogbook'; // Renamed to avoid conflicts
import SchoolSupervisorViewLogbook from '../screens/SchoolSupervisor/StudentLogbook';



const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SuperAdminForm" component={SuperAdminForm} />
        <Stack.Screen name="SchoolSupervisorForm" component={SchoolSupervisorForm} />
        <Stack.Screen name="IndustrialSupervisorForm" component={IndustrialSupervisorForm} />
        <Stack.Screen name="StudentForm" component={StudentForm} />
        <Stack.Screen name="SuperAdminDashboard" component={SuperAdminDashboard} />
        <Stack.Screen name="SchoolSupervisorDashboard" component={SchoolSupervisorDashboard} />
        <Stack.Screen name="IndustrialSupervisorDashboard" component={IndustrialSupervisorDashboard} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="AddStudents" component={AddStudents} />
        <Stack.Screen name="AddSupervisors" component={AddSupervisors} />
        <Stack.Screen name="AssignStudents" component={AssignStudents} />
        <Stack.Screen name="ViewStudents" component={ViewStudents} />
        <Stack.Screen name="ViewSupervisors" component={ViewSupervisors} />
        <Stack.Screen name="AddLogbookEntry" component={AddLogbookEntry} />
        <Stack.Screen name="ViewLogbook" component={ViewLogbook} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="ViewStudentLogbook" component={IndustrialSupervisorViewLogbook} />
        <Stack.Screen name="StudentLogbook" component={SchoolSupervisorViewLogbook} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
