import axios from 'axios';

const stackExchangeApi = axios.create({
  baseURL: 'https://api.stackexchange.com/2.3/tags',
});

export default stackExchangeApi;