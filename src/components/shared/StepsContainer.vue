<template>
  <div class="steps-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'steps-container',
});
</script>

<style scoped>
.steps-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}
</style>
