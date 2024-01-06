import axios from './api';

export default {
  getUsernames: async function () {
    return axios.get('/api/users/field?field=username').then((res) => {
      return res.data;
    });
  },
};
