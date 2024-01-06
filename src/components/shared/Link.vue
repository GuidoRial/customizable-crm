<template>
  <router-link class="link" :to="to">{{ text }}</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'login-link',
  props: {
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.link {
  color: var(--primary-color);
  text-decoration: none;
}
</style>
