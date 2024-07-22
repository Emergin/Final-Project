// // import React, { useState } from 'react';
// // import { View, TextInput, Button, StyleSheet } from 'react-native';

// // const SuperAdminForm = () => {
// //   const [form, setForm] = useState({
// //     firstname: '',
// //     lastname: '',
// //     phonenumber: '',
// //     nationalId: ''
// //   });

// //   const handleChange = (name, value) => {
// //     setForm({ ...form, [name]: value });
// //   };

// //   const handleSubmit = () => {
// //     // Handle form submission logic here
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <TextInput
// //         placeholder="First Name"
// //         onChangeText={(value) => handleChange('firstname', value)}
// //         style={styles.input}
// //       />
// //       <TextInput
// //         placeholder="Last Name"
// //         onChangeText={(value) => handleChange('lastname', value)}
// //         style={styles.input}
// //       />
// //       <TextInput
// //         placeholder="Phone Number"
// //         onChangeText={(value) => handleChange('phonenumber', value)}
// //         style={styles.input}
// //       />
// //       <TextInput
// //         placeholder="National ID"
// //         onChangeText={(value) => handleChange('nationalId', value)}
// //         style={styles.input}
// //       />
// //       <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     padding: 16,
// //     backgroundColor: '#fff',
// //   },
// //   input: {
// //     height: 40,
// //     borderColor: 'gray',
// //     borderWidth: 1,
// //     marginBottom: 12,
// //     paddingHorizontal: 8,
// //   },
// // });

// // export default SuperAdminForm;



// // /home/trubel/Desktop/dekutattachment-app/screens/SuperAdmin/SuperAdminForm.js
// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
// import axios from 'axios';

// const SuperAdminForm = ({ navigation }) => {
//   const [firstname, setFirstname] = useState('');
//   const [lastname, setLastname] = useState('');
//   const [phonenumber, setPhonenumber] = useState('');
//   const [nationalId, setNationalId] = useState('');

//   const handleRegister = async () => {
//     try {
//       await axios.post('http://192.168.43.102:3000/register/superadmin', {
//         firstname,
//         lastname,
//         phonenumber,
//         nationalId,
//       });
//       navigation.navigate('SuperAdminDashboard');
//     } catch (error) {
//       console.error('Registration error:', error);
//       alert('Registration failed');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Super Admin Registration</Text>
//       <TextInput
//         placeholder="First Name"
//         value={firstname}
//         onChangeText={setFirstname}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Last Name"
//         value={lastname}
//         onChangeText={setLastname}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Phone Number"
//         value={phonenumber}
//         onChangeText={setPhonenumber}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="National ID"
//         value={nationalId}
//         onChangeText={setNationalId}
//         style={styles.input}
//       />
//       <Button title="Register" onPress={handleRegister} />
//     </View>
//   );
// };

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

