import { defineStore } from 'pinia';
import _ from 'lodash';
import { Blueprint, Field } from '@/interfaces/blueprints';
import blueprints from '@/services/blueprints';
import useLoading from './loading';
import useAuth from './auth';
const useBlueprint = defineStore('blueprint', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      blueprints: [] as Blueprint[],
      blueprint: {
        name: '',
        description: '',
        metadata: { canBeReferenced: false, map: '' },
      } as Blueprint,
      fields: [{ label: '', type: 'text', required: false, options: [''] }] as Field[],
    };
  },
  actions: {
    async createBlueprint() {
      const loading = useLoading();
      const auth = useAuth();
      try {
        loading.updateLoading(true);
        const blueprint = await blueprints.create({
          blueprint: { ...this.blueprint, user: auth.user._id },
          fields: this.fields,
        });

        console.log({ blueprint });
        this.blueprint = {
          name: '',
          description: '',
          metadata: { canBeReferenced: false, map: '' },
        };
        this.fields = [{ label: '', type: 'text', required: false, options: [''] }];
      } catch (e) {
        console.log({ e });
        throw e;
      } finally {
        loading.updateLoading(false);
      }
    },
    async getBlueprints() {
      const loading = useLoading();
      const user = useAuth();
      try {
        loading.updateLoading(true);
        const data = await blueprints.read({
          query: {
            user: user.user._id,
            populate: JSON.stringify([{ path: 'fields' }]),
          },
        });
        this.blueprints = data;
      } catch (e) {
        console.log({ e });
        throw e;
      } finally {
        loading.updateLoading(false);
      }
    },
    updateField(target: 'fields' | 'blueprint', path: string, value: unknown) {
      const obj = target === 'fields' ? this.fields : this.blueprint;
      _.set(obj, path, value);
    },
  },
});

export default useBlueprint;
