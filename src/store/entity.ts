import { defineStore } from 'pinia';
import _ from 'lodash';
import { Entity } from '@/interfaces/entities';
import entities from '@/services/entities';
import useAuth from './auth';
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
    async createEntity() {
      const user = useAuth();
      await entities.create({ ...this.entity, user: user.user._id });
      this.setDefault();
    },
    setDefault() {
      this.entity = {};
    },
  },
});

export default useEntity;
