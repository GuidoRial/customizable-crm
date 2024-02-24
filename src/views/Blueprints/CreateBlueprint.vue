<template>
  <CreateLayout>
    <Title
      title="Create Blueprint"
      tooltipText="Feel lost? Click me."
      to="blueprints-about"
      action="redirect"
    />

    <Steps :model="items" :active-step="active" />
    <StepsContainerVue>
      <Card class="card">
        <template #content>
          <BasicInfoStep v-if="active === 0" />
          <FieldsStep v-else-if="active === 1" />
          <ReferenceStep v-else-if="active === 2 && blueprint.metadata.canBeReferenced" />
          <ReviewStep
            v-else-if="(active === 2 && !blueprint.metadata.canBeReferenced) || active === 3"
          />
        </template>
        <template #footer>
          <div class="footer">
            <Button v-if="active > 0" label="Previous Step" type="button" @click="active -= 1" />
            <Button
              v-if="active < items.length - 1"
              :disabled="nextBtnDisabled"
              label="Next Step"
              type="submit"
              @click="active += 1"
            />
            <Button
              v-if="active === items.length - 1"
              class="p-button p-button-success"
              label="Create Blueprint"
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
import { defineComponent } from 'vue';
import BasicInfoStep from '@/components/Blueprints/Steps/BasicInfoStep.vue';
import FieldsStep from '@/components/Blueprints/Steps/FieldsStep.vue';
import ReferenceStep from '@/components/Blueprints/Steps/ReferenceStep.vue';
import ReviewStep from '@/components/Blueprints/Steps/ReviewStep.vue';
import { mapActions, mapState } from 'pinia';
import useBlueprint from '@/store/blueprint';
import { sleep } from '@/utils/sleep';
import Title from '@/components/shared/Title.vue';
import CreateLayout from '@/components/shared/CreateLayout.vue';
import StepsContainerVue from '@/components/shared/StepsContainer.vue';
export default defineComponent({
  name: 'blueprints-create',
  components: {
    StepsContainerVue,
    BasicInfoStep,
    FieldsStep,
    ReferenceStep,
    ReviewStep,
    Title,
    CreateLayout,
  },
  data() {
    return {
      active: 0 as number,
    };
  },
  methods: {
    ...mapActions(useBlueprint, ['createBlueprint']),
    async create() {
      try {
        await this.createBlueprint();
      } catch (e: any) {
        this.$toast.add({
          severity: 'error',
          summary: e.message,
          detail: e.response.data.message,
          life: 3000,
        });
      } finally {
        this.$toast.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Blueprint created successfully. Redirecting you to your blueprints page',
          life: 3000,
        });
        await sleep(3000);
        this.$router.push({ name: 'blueprints' });
      }
    },
  },
  computed: {
    ...mapState(useBlueprint, ['blueprint', 'fields']),
    items() {
      const base = [
        {
          label: 'Basic Info',
        },
        {
          label: 'Fields',
        },
        {
          label: 'Review',
        },
      ];

      if (this.blueprint.metadata.canBeReferenced) {
        base.splice(2, 0, {
          label: 'References',
        });
      }

      return base;
    },
    nextBtnDisabled(): boolean {
      // Validate that two labels do not exist with the same name otherwise keys will colide
      switch (this.active) {
        case 0:
          return this.blueprint.name === '';
        case 1:
          for (let field of this.fields) {
            if (field.label === '') return true;

            if (field.type === 'select' || field.type === 'radio') {
              if (field.options?.length < 2) return true;
              if (field.options?.some((option) => option === '')) return true;
            }
          }

          if (this.fields.every((f) => f.type != 'text')) return true;
          return false;
        case 2:
          if (this.blueprint.metadata.canBeReferenced) {
            if (!this.blueprint.metadata.map.length) return true;
          }
          return false;

        default:
          return true;
      }
    },
  },
});
</script>

<style scoped>
h2 {
  margin: 0;
}

.card {
  width: 50rem;
  height: auto;
}

.footer {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.field-description {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
  height: 1.5rem;
  padding: 1rem 0;
  margin: 0.5rem 0rem;
}

.icon {
  cursor: pointer;
  color: var(--primary-color);
}
</style>
