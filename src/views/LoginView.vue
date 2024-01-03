<template>
  <router-view>
    <div class="card flex justify-content-center">
      <InputText type="text" v-model="value" />
      <Checkbox v-model="checked" :binary="true" />
    </div>
  </router-view>
</template>

<script lang="ts">
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
export default {
  name: 'login-view',
  data() {
    return {
      value: null,
      checked: null,
    };
  },
  mounted() {
    console.log('login');
  },
};
</script>
