<template>
  <div class="field-description">
    <InfoIcon :tooltipText="tooltipText" />
    <p>{{ label }}</p>
  </div>
</template>

<script lang="ts">
import InfoIcon from '@/components/shared/InfoIcon.vue';

export default {
  name: 'field-description',
  props: {
    tooltipText: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
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
  margin: 0.5rem 0rem;
}
</style>
