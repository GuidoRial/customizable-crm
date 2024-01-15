<template>
  <div class="field-description">
    <InfoIcon
      v-if="tooltipText?.length"
      :tooltipText="`${required ? 'This field is required. ' : ''}${tooltipText}`"
    />
    <p>
      {{ label }} <span v-if="required" style="color: var(--primary-color)">{{ ' *' }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import InfoIcon from '@/components/shared/InfoIcon.vue';

export default {
  name: 'field-description',
  props: {
    tooltipText: {
      type: String,
    },
    label: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  components: { InfoIcon },
};
</script>

<style scoped>
.field-description {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
  height: 1.5rem;
  padding: 1rem 0;
  margin-top: 1rem;
}
</style>
