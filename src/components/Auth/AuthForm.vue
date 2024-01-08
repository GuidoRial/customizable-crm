<template>
  <div class="card-container">
    <SignUpForm :loading="loading" v-if="action === 'signup'" @formValid="handleSignup" />
    <LoginForm :loading="loading" v-else @formValid="handleLogin" />
    <Toast position="bottom-right" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { AuthUserDTO } from '@/interfaces/auth';
import SignUpForm from './SignUpForm.vue';
import LoginForm from './LoginForm.vue';
import { mapActions } from 'pinia';
import useUsers from '@/store/users';
import useAuth from '@/store/auth';
export default defineComponent({
  name: 'auth-form',
  components: { SignUpForm, LoginForm },
  data() {
    return {
      loading: false,
    };
  },
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
    ...mapActions(useAuth, ['login', 'signup']),
    show() {
      this.$toast.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Message Content',
        life: 3000,
      });
    },
    async handleSignup(user: AuthUserDTO) {
      try {
        this.loading = true;
        await this.signup(user);
        this.$router.push({ name: 'blueprints' });
      } catch (e: any) {
        this.$toast.add({
          severity: 'error',
          summary: e.message,
          detail: e.response.data.message,
          life: 3000,
        });
      } finally {
        this.loading = false;
      }
    },
    async handleLogin(user: AuthUserDTO) {
      try {
        this.loading = true;
        await this.login(user);
        this.$router.push({ name: 'blueprints' });
      } catch (e: any) {
        this.$toast.add({
          severity: 'error',
          summary: e.message,
          detail: e.response.data.message,
          life: 3000,
        });
      } finally {
        this.loading = false;
      }
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
