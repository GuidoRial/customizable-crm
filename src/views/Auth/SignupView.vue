<template>
  <div class="card-container">
    <AuthForm action="signup" @formValid="handleSignup" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthForm from '@/components/Auth/AuthForm.vue';
import { AuthUserDTO } from '@/interfaces/auth';
export default defineComponent({
  name: 'login-view',
  components: {
    AuthForm,
  },
  data() {
    return {};
  },
  methods: {
    handleSignup(user: AuthUserDTO) {
      console.log(user);
      console.log('Signup successful');
    },
  },
});
</script>
