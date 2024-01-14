import { defineStore } from 'pinia';
import _ from 'lodash';
import { Entity } from '@/interfaces/entities';
const useEntity = defineStore('entity', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      entity: {
        blueprint: '',
      } as Entity,
    };
  },
  actions: {
    setDefault() {
      this.entity = {};
    },
  },
});

export default useEntity;
