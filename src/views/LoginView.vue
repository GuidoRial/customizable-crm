<template>
  <div class="card-container">
    <div class="card flex justify-content-center">
      <Card>
        <template #title> Login </template>
        <template #content>
          <InputGroup >
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText placeholder="First Name" v-model="user.firstName"/>
            <InputGroupAddon>
              <i class="pi pi-at"></i>
            </InputGroupAddon>
            <InputText placeholder="Last Name" v-model="user.lastName"/>
          </InputGroup>
          <InputGroup style="margin-top: 2rem">
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText placeholder="Username" v-model="user.username"/>
            <InputGroupAddon>
              <i class="pi pi-at"></i>
            </InputGroupAddon>
            <InputText placeholder="Email" v-model="user.email"/>
          </InputGroup>
          <InputGroup style="margin-top: 2rem">
            <InputGroupAddon>
              <i class="pi pi-lock"></i>
            </InputGroupAddon>
            <span class="p-float-label">
              <Password v-model="user.password" input-id="password" toggleMask >
                <template #header>
                  <h6>Pick a password</h6>
                </template>
                <template #footer>
                  <Divider />
                  <p class="mt-2">Suggestions</p>
                  <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                    <li>At least one lowercase</li>
                    <li>At least one uppercase</li>
                    <li>At least one numeric</li>
                    <li>Minimum 8 characters</li>
                  </ul>
                </template>
              </Password>
              <label for="password">Password</label>
            </span>
          </InputGroup>
          <InputGroup style="margin-top: 2rem">
            <InputGroupAddon>
              <i class="pi pi-lock"></i>
            </InputGroupAddon>
            <span class="p-float-label">
              <Password v-model="user.confirmPassword" input-id="password" toggleMask />
              <label for="password">Confirm password</label>
            </span>
          </InputGroup>
        </template>
        <template #footer>
          <Button icon="pi pi-check" label="Save" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
export default {
  name: 'login-view',
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    };
  },
  mounted() {
    console.log('login');
  },
};
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
