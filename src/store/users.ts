import { defineStore } from 'pinia';
import users from '@/services/users';

const useUsers = defineStore('users', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      usernames: [],
    };
  },
  actions: {
    async getUsernames(): Promise<{ username: string; _id: string }[]> {
      try {
        const data = await users.getUsernames();
        return data;
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
  },
});

export default useUsers;
