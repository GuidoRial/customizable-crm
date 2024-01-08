<template><i class="pi pi-exclamation-circle icon" v-tooltip.top="tooltipText" /></template>

<script lang="ts">
export default {
  name: 'field-description',
  props: {
    tooltipText: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.icon {
  cursor: pointer;
  color: var(--primary-color);
}
</style>
