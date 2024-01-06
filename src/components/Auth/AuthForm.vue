<template>
  <div class="card-container">
    <SignUpForm v-if="action === 'signup'" @formValid="handleSignup" />
    <LoginForm v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AuthUserDTO } from '@/interfaces/auth';
import SignUpForm from './SignUpForm.vue';
import LoginForm from './LoginForm.vue';
import { mapActions } from 'pinia';
import useUsers from '@/store/users';
export default defineComponent({
  name: 'login-view',
  components: { SignUpForm, LoginForm },
  props: {
    action: {
      type: String,
      required: true,
    },
  },
  async created() {
    await this.getUsernames();
  },
  methods: {
    ...mapActions(useUsers, ['getUsernames']),
    handleSignup(user: AuthUserDTO) {
      console.log(user);
      console.log('Signup successful');
    },
    handleLogin() {
      console.log('Login successful');
    },
  },
});
</script>

<style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.card {
  width: 40rem;
}
</style>
