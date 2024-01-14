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
              <InputGroup style="margin-top: 1rem" v-if="field.type === 'text'">
                <InputText :label="field.label" :placeholder="field.label" />
              </InputGroup>
              <InputGroup style="margin-top: 1rem" v-if="field.type === 'number'">
                <InputNumber :label="field.label" :placeholder="field.label" />
              </InputGroup>
              <InputGroup style="margin-top: 1rem" v-if="field.type === 'textarea'">
                <Textarea :label="field.label" :placeholder="field.label" />
              </InputGroup>
              <InputGroup style="margin-top: 1rem" v-if="field.type === 'select'">
                <Dropdown
                  :label="field.label"
                  :placeholder="field.label"
                  :options="field.options"
                />
              </InputGroup>
              <div style="margin-top: 1rem" class="checkbox" v-if="field.type === 'checkbox'">
                <Checkbox :label="field.label" :placeholder="field.label" :binary="true" />
              </div>

              <div class="checkbox" v-if="field.type === 'radio'">
                <div>
                  <p>{{ field.label }}</p>
                  <div
                    v-for="(option, index) in field.options"
                    :key="index"
                    class="checkbox"
                    style="margin-top: 1rem"
                  >
                    <RadioButton inputId="ingredient1" :value="option" />
                    <label for="ingredient1" style="margin-left: 0.5rem">{{ option }}</label>
                  </div>
                </div>
              </div>
              <InputGroup style="margin-top: 1rem" v-if="field.type === 'date'">
                <Calendar showIcon :label="field.label" />
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
              @click="active += 1"
            />
            <Button
              v-if="active === items.length - 1"
              class="p-button p-button-success"
              label="Create Blueprint"
              type="button"
            />
          </div>
        </template>
      </Card>
    </StepsContainerVue>
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
// If I have a parameter with a blueprint_id then I can use that one, otherwise I can
// get a dropdown to select the right one

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
        {
          label: 'Review',
        },
      ];

      return base;
    },
    nextBtnDisabled(): boolean {
      switch (this.active) {
        case 0:
          return this.blueprint.name === '';
        case 1:
          return true;
        case 2:
          return true;

        default:
          return true;
      }
    },
  },
  methods: {
    ...mapActions(useBlueprint, ['getBlueprint', 'setDefault', 'getBlueprints']),
  },

  components: { CreateLayout, Title, StepsContainerVue },

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

.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
