<template>
  <div class="header">
    <h1>{{ title }}</h1>
    <InfoIcon v-if="tooltipText" :tooltipText="tooltipText" @click="handleClick" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InfoIcon from './InfoIcon.vue';
import { NavigationFailure } from 'vue-router';
export default defineComponent({
  name: 'section-title',
  components: { InfoIcon },
  props: ['title', 'tooltipText', 'action', 'to'],
  methods: {
    handleClick() {
      if (this.action === 'redirect') {
        this.$router.push({ name: this.to });
      }
    },
  },
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: var(--primary-color);
}
</style>
