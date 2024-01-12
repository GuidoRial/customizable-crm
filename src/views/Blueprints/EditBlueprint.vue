<template>
  <p>Edit</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'edit-blueprint',
  mounted() {
    console.log(this.$route.params.id);
  },
});
</script>
