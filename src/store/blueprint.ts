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
      blueprints: [] as Blueprint[], // View all
      blueprint: {
        name: '',
        description: '',
        metadata: { canBeReferenced: false, map: '' }, // Workbench or create blueprint
      } as Blueprint,
      fields: [{ label: '', type: 'text', required: false, options: [''] }] as Field[],
    };
  },
  actions: {
    setDefault() {
      this.blueprint = {
        name: '',
        description: '',
        metadata: { canBeReferenced: false, map: '' },
      };
      this.fields = [{ label: '', type: 'text', required: false, options: [''] }];
    },
    async createBlueprint() {
      const loading = useLoading();
      const auth = useAuth();
      try {
        loading.updateLoading(true);
        await blueprints.create({
          blueprint: { ...this.blueprint, user: auth.user._id },
          fields: this.fields,
        });

        this.setDefault();
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
    async getBlueprint(id: string) {
      const loading = useLoading();
      const user = useAuth();
      try {
        loading.updateLoading(true);
        const data = await blueprints.read({
          id,
          query: {
            populate: JSON.stringify([{ path: 'fields' }]),
          },
        });

        if (data.user !== user.user._id) {
          throw new Error('You are not allowed to access this blueprint');
        }

        this.blueprint = data;
        this.fields = data.fields;
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
