// /home/trubel/Desktop/dekutattachment-app/screens/ViewLogbooks.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import config from '../../config';

const IndustrialSupervisorViewLogbook = ({ route }) => {
  const [logbooks, setLogbooks] = useState([]);
  const { studentId } = route.params;

  useEffect(() => {
    const fetchLogbooks = async () => {
      try {
        const response = await axios.get(`http://${config.ipAddress}:3000/logbook/${studentId}`);
        setLogbooks(response.data);
      } catch (error) {
        console.error('Error fetching logbooks:', error);
      }
    };

    fetchLogbooks();
  }, [studentId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={logbooks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.logbookItem}>
            <Text>Day: {item.day}</Text>
            <Text>Activity: {item.activity}</Text>
            <Text>Benefit: {item.benefit}</Text>
            <Text>Supervisor Activity: {item.supervisorActivity}</Text>
            <Text>Month: {item.month}</Text>
            <Text>Week: {item.week}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logbookItem: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default IndustrialSupervisorViewLogbook;
