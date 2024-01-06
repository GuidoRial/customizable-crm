<template>
  <div class="card-container">
    <AuthForm action="login" @formValid="handleLogin" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthForm from '@/components/Auth/AuthForm.vue';
export default defineComponent({
  name: 'login-view',
  components: {
    AuthForm,
  },
  data() {
    return {};
  },

  methods: {
    handleLogin() {
      console.log('Login successful');
    },
  },
});
</script>
