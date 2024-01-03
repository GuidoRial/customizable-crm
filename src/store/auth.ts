import { defineStore } from 'pinia';
import auth from '@/services/auth';
import { IUser } from '@/interfaces/auth';

const useAuth = defineStore('auth', {
  // arrow function recommended for full type inference
  state: () => {
    const token = window.localStorage.getItem('access-token') || '';
    const user = JSON.parse(window.localStorage.getItem('user') || '{}');
    return {
      token,
      user,
    };
  },
  getters: {
    isAdmin(state) {
      return state.user.role === 'admin';
    },
    isLoggedIn(state) {
      return !!state.token;
    },
  },
  actions: {
    async login(credentials: IUser) {
      try {
        const data = await auth.login(credentials);
        console.log({ data });
        debugger;
        // this.user = user;
        // this.token = token;
        // localStorage.setItem('user', JSON.stringify(user));
        // localStorage.setItem('token', token);
        // return user;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    async signup(user: IUser) {
      try {
        const data = await auth.signUp(user);
        console.log({ data });

        debugger;
        // this.user = res.result.user;
        // this.token = res.result.token;
        // const token = res.result.token;
        // window.localStorage.setItem('token', token);
        // window.localStorage.setItem('user', JSON.stringify(this.user));
        // return res.result;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.token = '';
      this.user = {};
    },
  },
});

export default useAuth;
