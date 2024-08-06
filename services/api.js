import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.11:3000', // Replace <YOUR_SERVER_IP> with your server's IP address
});

export default api;
