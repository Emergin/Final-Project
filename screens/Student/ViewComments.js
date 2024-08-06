// /home/trubel/Desktop/dekutattachment-app/screens/Student/ViewComments.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ViewComments = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comments</Text>
      {/* Add comments details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default ViewComments;
