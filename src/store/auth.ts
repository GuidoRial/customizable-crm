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
    storeItem(key: string, value: string) {
      window.localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    },
    removeItem(key: string) {
      window.localStorage.removeItem(key);
    },
    getItem(key: string) {
      return window.localStorage.getItem(key);
    },
    async login(credentials: IUser) {
      try {
        const data = await auth.login(credentials);
        const { sesion: token, user } = data;
        this.storeItem('access-token', token);
        this.storeItem('user', user);
        this.user = user;
        this.token = token;
        return data;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    async signup(credentials: IUser) {
      try {
        const data = await auth.signUp(credentials);
        const { sesion: token, user } = data;
        this.storeItem('access-token', token);
        this.storeItem('user', user);
        this.user = user;
        this.token = token;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    logout() {
      this.removeItem('token');
      this.removeItem('user');
      this.token = '';
      this.user = {};
    },
  },
});

export default useAuth;
