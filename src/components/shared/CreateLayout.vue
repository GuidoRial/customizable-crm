<template>
  <div class="layout">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'create-layout',
});
</script>

<style scoped>
.layout {
  margin: 1rem;
}
</style>
