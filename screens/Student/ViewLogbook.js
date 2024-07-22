// /home/trubel/Desktop/dekutattachment-app/screens/Student/ViewLogbook.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const ViewLogbook = ({ route }) => {
  const { studentId } = route.params;
  const [logbookEntries, setLogbookEntries] = useState([]);

  useEffect(() => {
    const fetchLogbookEntries = async () => {
      try {
        const response = await axios.get(`http://192.168.43.102:3000/logbook/${studentId}`);
        setLogbookEntries(response.data);
      } catch (error) {
        console.error('Error fetching logbook entries:', error);
      }
    };

    fetchLogbookEntries();
  }, [studentId]);

  return (
    <View style={styles.container}>
      <Text>Logbook Entries</Text>
      <FlatList
        data={logbookEntries}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.entry}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  entry: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default ViewLogbook;
