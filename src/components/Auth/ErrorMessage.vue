<template>
  <small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'error-message',
  props: {
    errorMessage: {
      type: String,
      required: true,
    },
  },
});
</script>
