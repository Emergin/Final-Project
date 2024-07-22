// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import axios from 'axios';

// const SuperAdminForm = ({ navigation }) => {
//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [nationalId, setNationalId] = useState('');

//   const handleRegister = async () => {
//     try {
//       await axios.post('http://127.0.0.1:3000/superadmin/register', {
//         firstname,
//         lastname,
//         phoneNumber,
//         nationalId
//       });
//       navigation.navigate('SuperAdminDashboard');
//     } catch (error) {
//       console.error('Registration error:', error);
//       alert('Registration failed');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>SuperAdmin Registration</Text>
//       <TextInput placeholder="First Name" value={firstname} onChangeText={setFirstname} style={styles.input} />
//       <TextInput placeholder="Last Name" value={lastname} onChangeText={setLastname} style={styles.input} />
//       <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} />
//       <TextInput placeholder="National ID" value={nationalId} onChangeText={setNationalId} style={styles.input} />
//       <Button title="Register" onPress={handleRegister} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   input: {
//     width: 200,
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
// });

// export default SuperAdminForm;

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';

const SuperAdminForm = ({ navigation }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [nationalId, setNationalId] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://192.168.43.102:3000/register/superadmin', {
        firstname,
        lastname,
        phonenumber,
        nationalId,
      });
      navigation.navigate('SuperAdminDashboard');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Super Admin Registration</Text>
      <TextInput placeholder="First Name" value={firstname} onChangeText={setFirstname} style={styles.input} />
      <TextInput placeholder="Last Name" value={lastname} onChangeText={setLastname} style={styles.input} />
      <TextInput placeholder="Phone Number" value={phonenumber} onChangeText={setPhonenumber} style={styles.input} />
      <TextInput placeholder="National ID" value={nationalId} onChangeText={setNationalId} style={styles.input} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SuperAdminForm;

