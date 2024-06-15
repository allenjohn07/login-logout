import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://login-logout-jxyq.onrender.com',
    // baseURL: 'http://localhost:8000',  
    headers: {
      'Content-Type': 'application/json', 
    },
  });