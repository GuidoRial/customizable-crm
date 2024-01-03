<template>
  <router-view><div>login</div></router-view>
</template>

<script lang="ts">
export default {
  name: 'login-view',
  mounted() {
    console.log('login');
  },
};
</script>
