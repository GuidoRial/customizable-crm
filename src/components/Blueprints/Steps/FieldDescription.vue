<template>
  <div class="field-description">
    <i class="pi pi-exclamation-circle icon" v-tooltip.top="tooltipText" />
    <p>{{ label }}</p>
  </div>
</template>

<script lang="ts">
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

.icon {
  cursor: pointer;
  color: var(--primary-color);
}
</style>
