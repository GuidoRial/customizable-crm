<template>
  <div class="create-blueprint">
    <div class="header">
      <h1>Create Blueprint</h1>
      <InfoIcon
        @click="$router.push({ name: 'blueprints-about' })"
        tooltipText="Feel lost? Click me."
      />
    </div>
    <Steps :model="items" :active-step="active" />
    <div class="card-container">
      <Card class="card">
        <template #content>
          <BasicInfoStep v-if="active === 0" :blueprint="blueprint" />
          <FieldsStep v-else-if="active === 1" :fields="fields" />
          <ReferenceStep
            v-else-if="active === 2 && blueprint.metadata.canBeReferenced"
            :fields="fields"
            :blueprint="blueprint"
          />
          <ReviewStep
            v-else-if="(active === 2 && !blueprint.metadata.canBeReferenced) || active === 3"
            :blueprint="blueprint"
            :fields="fields"
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
              @click="confirm1"
            />
          </div>
        </template>
      </Card>
    </div>
    <ConfirmPopup />
    <Toast />
  </div>
</template>

<script lang="ts">
import { Blueprint, Field } from '@/interfaces/blueprints';
import { defineComponent } from 'vue';
import BasicInfoStep from '@/components/Blueprints/Steps/BasicInfoStep.vue';
import FieldsStep from '@/components/Blueprints/Steps/FieldsStep.vue';
import ReferenceStep from '@/components/Blueprints/Steps/ReferenceStep.vue';
import ReviewStep from '@/components/Blueprints/Steps/ReviewStep.vue';
import InfoIcon from '@/components/shared/InfoIcon.vue';
export default defineComponent({
  name: 'blueprints-create',
  components: { BasicInfoStep, FieldsStep, ReferenceStep, ReviewStep, InfoIcon },
  data() {
    return {
      blueprint: {
        name: 'Contact',
        description: 'A contact is a person or company that you want to keep track of.',
        metadata: {
          canBeReferenced: false,
          map: '',
        },
      } as Blueprint,
      fields: [
        {
          label: 'Is Active',
          type: 'radio',
          required: false,
          options: ['Yes', 'No'],
        },
        {
          label: 'Contact Name',
          type: 'text',
          required: false,
          options: [''],
        },
        {
          label: 'Contact Email',
          type: 'text',
          required: false,
          options: [''],
        },
        {
          label: 'Contact Phone',
          type: 'text',
          required: false,
          options: [''],
        },
        {
          label: 'Contact Address',
          type: 'text',
          required: false,
          options: [''],
        },
      ] as Field[],
      active: 0 as number,
    };
  },
  methods: {
    confirm1(event: any) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Are you sure you want to create this blueprint?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.$toast.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'You have accepted',
            life: 3000,
          });
        },
        reject: () => {
          this.$toast.add({
            severity: 'error',
            summary: 'Rejected',
            detail: 'You have rejected',
            life: 3000,
          });
        },
      });
    },
  },
  computed: {
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
      switch (this.active) {
        case 0:
          return this.blueprint.name === '';
        case 1:
          for (let field of this.fields) {
            if (field.label === '') return true;

            if (field.type === 'select' || field.type === 'radio') {
              if (field.options?.some((option) => option === '')) return true;
            }
          }
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
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: var(--primary-color);
}
.create-blueprint {
  margin: 1rem;
}
.card-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
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
