import { defineStore } from 'pinia';

const useLoading = defineStore('loading', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      loading: false,
    };
  },

  actions: {
    updateLoading(value: boolean) {
      this.loading = value;
    },
  },
});

export default useLoading;
