import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://login-logout-jxyq.onrender.com', 
    headers: {
      'Content-Type': 'application/json', 
    },
  });