import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:1337',
  responseType: 'json',
});
