import { defineStore } from 'pinia';
import _ from 'lodash';
import { Blueprint, Field } from '@/interfaces/blueprints';
const useBlueprint = defineStore('blueprint', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      blueprint: {
        name: '',
        description: '',
        metadata: {
          canBeReferenced: false,
          map: '',
        },
      } as Blueprint,
      fields: [
        {
          label: '',
          type: 'text',
          required: false,
          options: [''],
        },
      ] as Field[],
    };
  },
  actions: {
    updateField(target: 'fields' | 'blueprint', path: string, value: unknown) {
      const obj = target === 'fields' ? this.fields : this.blueprint;
      _.set(obj, path, value);
    },
  },
});

export default useBlueprint;
