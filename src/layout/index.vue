<template>
  <router-view></router-view>
</template>

<script lang="ts">
export default {
  name: 'Layout-Test',
  mounted() {
    console.log('layout');
  },
};
</script>
