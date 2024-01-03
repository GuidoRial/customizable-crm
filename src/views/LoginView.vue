<template>
  <!-- <div class="card-container">
    <div class="card flex justify-content-center">
      <form novalidate @submit.prevent="onSubmit">
        <Card>
          <template #title> Login </template>
          <template #content>
            <InputGroup>
              <InputGroupAddon>
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText placeholder="First Name" v-model="user.firstName" />
              <InputGroupAddon>
                <i class="pi pi-at"></i>
              </InputGroupAddon>
              <InputText placeholder="Last Name" v-model="user.lastName" />
            </InputGroup>
            <InputGroup style="margin-top: 2rem">
              <InputGroupAddon>
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText placeholder="Username" v-model="user.username" />
              <InputGroupAddon>
                <i class="pi pi-at"></i>
              </InputGroupAddon>
              <InputText placeholder="Email" v-model="user.email" />
            </InputGroup>
            <InputGroup style="margin-top: 2rem">
              <InputGroupAddon>
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <span class="p-float-label">
                <Password v-model="user.password" input-id="password" toggleMask>
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
            <Button icon="pi pi-check" label="Save" type="submit" />
          </template>
        </Card>
      </form>
    </div>
  </div> -->
  <div class="card flex justify-content-center">
    <form @submit="onSubmit" class="flex flex-column align-items-center gap-2">
      <TriStateCheckbox
        v-model="value"
        :class="{ 'p-invalid': errorMessage }"
        aria-describedby="text-error"
      />
      <div>* I've read and accept the terms & conditions.</div>
      <small id="text-error" class="p-error">{{ errorMessage || '&nbsp;' }}</small>
      <Button type="submit" label="Submit" />
    </form>
    <Toast />
  </div>
</template>

<script lang="ts">
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import { useToast } from 'primevue/usetoast';
import { useField, useForm } from 'vee-validate';

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
        confirmPassword: '',
      },
    };
  },
  setup() {
    const { handleSubmit, resetForm } = useForm();
    const { value, errorMessage } = useField('value', validateField);
    const toast = useToast();

    function validateField(value: null) {
      if (typeof value === 'undefined' || value === null) {
        return 'Value is required.';
      }

      return true;
    }

    const onSubmit = handleSubmit((values) => {
      if (values.value) {
        toast.add({
          severity: 'info',
          summary: 'Form Submitted',
          detail: values.value,
          life: 3000,
        });
        resetForm();
      }
    });

    return { value, handleSubmit, onSubmit, errorMessage };
  },
  methods: {},
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
