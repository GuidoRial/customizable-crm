<template>
  <CreateLayout>
    <Title
      title="Workbench"
      tooltipText="Feel lost? Click me."
      to="blueprints-about"
      action="redirect"
    />

    <Steps :model="items" :active-step="active" />

    <StepsContainerVue>
      <Card class="card">
        <template #content>
          <div v-if="active == 0">
            <InputGroup>
              <Dropdown
                placeholder="Select a Blueprint"
                optionLabel="label"
                optionValue="value"
                v-model="entity.blueprint"
                :options="blueprints.map((b: Blueprint) => ({ label: b.name, value: b._id }))"
              />
            </InputGroup>
          </div>

          <div v-else-if="active == 1">
            <div v-for="(field, i) in fields" :key="i">
              <FieldDescription
                :tooltipText="field?.description ? field.description : ''"
                :label="field.label"
                :required="field.required"
              />
              <InputGroup style="margin-top: 1rem" v-if="field.type === 'text'">
                <InputText
                  :label="field.label"
                  :placeholder="field.label"
                  v-model="entity[field.key as keyof typeof entity]"
                />
              </InputGroup>
              <InputGroup style="margin-top: 1rem" v-if="field.type === 'number'">
                <InputNumber
                  v-model="entity[field.key as keyof typeof entity]"
                  :label="field.label"
                  :placeholder="field.label"
                />
              </InputGroup>
              <InputGroup style="margin-top: 1rem" v-if="field.type === 'textarea'">
                <Textarea
                  v-model="entity[field.key as keyof typeof entity]"
                  :label="field.label"
                  :placeholder="field.label"
                />
              </InputGroup>
              <InputGroup style="margin-top: 1rem" v-if="field.type === 'select'">
                <Dropdown
                  v-model="entity[field.key as keyof typeof entity]"
                  :label="field.label"
                  :placeholder="field.label"
                  :options="field.options"
                />
              </InputGroup>
              <div style="margin-top: 1rem" class="checkbox" v-if="field.type === 'checkbox'">
                <Checkbox
                  v-model="entity[field.key as keyof typeof entity]"
                  :inputId="`checkbox-${i}`"
                  :label="field.label"
                  :placeholder="field.label"
                  :binary="true"
                />
                <label :for="`checkbox-${i}`">{{ field.label }}</label>
              </div>

              <div class="radio" v-if="field.type === 'radio'">
                <div>
                  <p>{{ field.label }}</p>
                  <div
                    v-for="(option, index) in field.options"
                    :key="index"
                    class="radio"
                    style="margin-top: 1rem"
                  >
                    <RadioButton
                      v-model="entity[field.key as keyof typeof entity]"
                      inputId="ingredient1"
                      :value="option"
                    />
                    <label for="ingredient1" style="margin-left: 0.5rem">{{ option }}</label>
                  </div>
                </div>
              </div>
              <InputGroup style="margin-top: 1rem" v-if="field.type === 'date'">
                <Calendar
                  v-model="entity[field.key as keyof typeof entity]"
                  :placeholder="field.label"
                  showIcon
                  :label="field.label"
                />
              </InputGroup>
            </div>
          </div>
        </template>

        <template #footer>
          <div class="footer">
            <Button
              v-if="active > 0"
              label="Previous Step"
              type="button"
              @click="active -= 1"
              :disabled="
                !!(active === 1 && $route.query.blueprint && $route.query.blueprint.length)
              "
            />
            <Button
              v-if="active < items.length - 1"
              label="Next Step"
              type="submit"
              :disabled="nextBtnDisabled"
              @click="active += 1"
            />
            <Button
              v-if="active === items.length - 1"
              class="p-button p-button-success"
              label="Create Entity"
              :disabled="createBtnDisabled"
              type="button"
              @click="create"
            />
          </div>
        </template>
      </Card>
    </StepsContainerVue>
    <Toast />
  </CreateLayout>
</template>

<script lang="ts">
import CreateLayout from '@/components/shared/CreateLayout.vue';
import Title from '@/components/shared/Title.vue';
import { Blueprint } from '@/interfaces/blueprints';
import useBlueprint from '@/store/blueprint';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';
import StepsContainerVue from '@/components/shared/StepsContainer.vue';
import useEntity from '@/store/entity';
import FieldDescription from '@/components/Blueprints/Steps/FieldDescription.vue';
import { sleep } from '@/utils/sleep';

export default defineComponent({
  name: 'workbench-view',

  data() {
    return {
      active: 0 as number,
    };
  },

  computed: {
    ...mapState(useBlueprint, ['blueprint', 'blueprints', 'fields']),
    ...mapState(useEntity, ['entity']),
    items() {
      const base = [
        {
          label: 'Select Blueprint',
        },
        {
          label: 'Input data',
        },
      ];

      return base;
    },
    createBtnDisabled(): boolean {
      const requiredKeys = this.blueprint.fields?.filter((f) => f.required).map((f) => f.key) ?? [];

      for (let key of requiredKeys) {
        if (!this.entity[key as keyof typeof this.entity]) {
          return true;
        }
      }

      return false;
    },
    nextBtnDisabled(): boolean {
      switch (this.active) {
        case 0:
          return this.entity.blueprint == '';
        default:
          return true;
      }
    },
  },
  methods: {
    ...mapActions(useBlueprint, ['getBlueprint', 'setDefault', 'getBlueprints']),
    ...mapActions(useEntity, ['createEntity']),
    async create() {
      try {
        await this.createEntity();
      } catch (error: any) {
        this.$toast.add({
          severity: 'error',
          summary: error.message,
          detail: error.response.data.message,
          life: 3000,
        });
      } finally {
        await sleep(3000);
        this.$toast.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Entity created successfully. Redirecting you to your blueprints page',
          life: 3000,
        });
        this.$router.push({ name: 'blueprints' });
      }
    },
  },

  components: { CreateLayout, Title, StepsContainerVue, FieldDescription },

  async created() {
    if (this.$route.query.blueprint) {
      await this.getBlueprint(this.$route.query.blueprint as string);
      this.entity.blueprint = this.$route.query.blueprint as string;
      this.active = 1;
    } else {
      await this.getBlueprints();
    }
  },

  mounted() {
    console.log(this.entity);
  },

  watch: {
    'entity.blueprint'(newValue) {
      this.getBlueprint(newValue);
    },
  },

  unmounted() {
    this.setDefault();
  },
});
</script>

<style scoped>
.card {
  width: 50rem;
  height: auto;
}
.footer {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.radio {
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
}
</style>
