import { IUser } from '@/interfaces/auth';
import axios from './api';

export default {
  login: async function (body: IUser) {
    const res = await axios.post('/api/auth/sign-in', body);
    return res.data;
  },
  signUp: async function (body: Partial<IUser>) {
    const res = await axios.post('/api/auth/sign-up', body);
    return res.data;
  },
};
