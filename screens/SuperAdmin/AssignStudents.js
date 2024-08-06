// /home/trubel/Desktop/dekutattachment-app/screens/SuperAdmin/AssignStudents.js

import React, { useEffect, useState } from 'react';
import { View, Text, Picker, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import config from '../../config';

const AssignStudents = () => {
  const [students, setStudents] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSupervisor, setSelectedSupervisor] = useState('');

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const studentsResponse = await axios.get(`http://${config.ipAddress}:3000/students`);
        const supervisorsResponse = await axios.get(`http://${config.ipAddress}:3000/supervisors`);
        setStudents(studentsResponse.data);
        setSupervisors(supervisorsResponse.data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };

    fetchLists();
  }, []);

  const handleAssign = async () => {
    try {
      await axios.post(`http://${config.ipAddress}:3000/assign`, {
        studentId: selectedStudent,
        supervisorId: selectedSupervisor,
      });
      alert('Supervisor assigned to student successfully');
    } catch (error) {
      console.error('Error assigning supervisor:', error);
      alert('Assignment failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Assign Supervisors to Students</Text>
      <Text>Select Student</Text>
      <Picker
        selectedValue={selectedStudent}
        onValueChange={(itemValue) => setSelectedStudent(itemValue)}
        style={styles.picker}
      >
        {students.map((student) => (
          <Picker.Item key={student.id} label={`${student.firstname} ${student.lastname}`} value={student.id} />
        ))}
      </Picker>
      <Text>Select Supervisor</Text>
      <Picker
        selectedValue={selectedSupervisor}
        onValueChange={(itemValue) => setSelectedSupervisor(itemValue)}
        style={styles.picker}
      >
        {supervisors.map((supervisor) => (
          <Picker.Item key={supervisor.id} label={`${supervisor.firstname} ${supervisor.lastname}`} value={supervisor.id} />
        ))}
      </Picker>
      <Button title="Assign Supervisor" onPress={handleAssign} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
});

export default AssignStudents;
