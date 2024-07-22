import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const ViewSupervisors = () => {
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get('http://192.168.43.102:3000/supervisors');
        setSupervisors(response.data);
      } catch (error) {
        console.error('Error fetching supervisors:', error);
      }
    };

    fetchSupervisors();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Supervisors List:</Text>
      <FlatList
        data={supervisors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.firstname} {item.lastname} - {item.phonenumber}</Text>
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
  listItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default ViewSupervisors;
