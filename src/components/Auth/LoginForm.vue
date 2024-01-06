<template>
  <div class="card flex justify-content-center">
    <div class="card flex justify-content-center">
      <form novalidate @submit.prevent="onSubmit">
        <Card>
          <template #title> Login </template>
          <template #content>
            <InputGroup style="margin-top: 2rem">
              <InputGroupAddon>
                <i class="pi pi-user"></i>
              </InputGroupAddon>
              <InputText
                :class="{ 'p-invalid': errorMessages.identifier }"
                placeholder="Username or Email"
                v-model="user.identifier"
              />
            </InputGroup>
            <InputGroup style="margin-top: 2rem">
              <InputGroupAddon>
                <i class="pi pi-lock"></i>
              </InputGroupAddon>
              <span class="p-float-label">
                <Password
                  :class="{ 'p-invalid': errorMessages.password }"
                  v-model="user.password"
                  input-id="password"
                  toggleMask
                >
                </Password>
                <label for="password">Password</label>
              </span>
            </InputGroup>
          </template>
          <template #footer>
            <div class="footer">
              <Button label="Login" type="submit">
                <ProgressSpinner
                  v-if="loading"
                  style="width: 3.7rem; height: 1.2rem"
                  strokeWidth="8"
                />
              </Button>
              <ErrorMessage
                v-if="errorMessageShouldBeShown"
                :errorMessage="errorMessages[currentErrorField]"
              />
              <div>Don't have an account? <Link to="/signup" text="Signup" /></div>
            </div>
          </template>
        </Card>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fieldCannotBeEmpty, passwordIsValid } from '@/utils/validators';
import ErrorMessage from '@/components/Auth/ErrorMessage.vue';
import { AuthUserDTO, ErrorMessages, FieldConditions } from '@/interfaces/auth';
import Link from '@/components/shared/Link.vue';
export default defineComponent({
  name: 'login-form',
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    ErrorMessage,
    Link,
  },
  data() {
    return {
      currentErrorField: '' as string,
      errorMessages: {
        identifier: '',
        password: '',
      } as ErrorMessages,
      user: {
        identifier: '',
        password: '',
      } as AuthUserDTO,
      conditionsSet: [] as FieldConditions[],
    };
  },
  computed: {
    errorMessageShouldBeShown() {
      const errors = Object.values(this.errorMessages) as string[];
      return errors.filter((msg: string) => msg.length > 0).length;
    },
  },
  methods: {
    setConditionsSet() {
      const conditionSet = [
        {
          field: 'identifier',
          conditions: [{ cb: fieldCannotBeEmpty, msg: 'An email or username is required' }],
        },

        {
          field: 'password',
          conditions: [
            { cb: fieldCannotBeEmpty, msg: 'A password is required' },
            {
              cb: passwordIsValid,
              msg: 'Password should have at least 1 number, 1 lowercase, 1 uppercase and 8 characters',
            },
          ],
        },
      ];
      this.conditionsSet = conditionSet as FieldConditions[];
    },
    getDefaultErrorMessages() {
      return {
        identifier: '',
        password: '',
      } as ErrorMessages;
    },
    isFormValid() {
      this.errorMessages = this.getDefaultErrorMessages();
      for (let { field, conditions } of this.conditionsSet) {
        for (let { cb, msg } of conditions) {
          const userField = this.user[field as keyof typeof this.user];
          if (typeof userField == 'undefined') return;
          const fieldIsValid = cb(userField);
          if (!fieldIsValid) {
            this.errorMessages[field] = msg;
            this.currentErrorField = field;
            return false;
          }
        }
      }
      return true;
    },
    onSubmit(): void {
      if (!this.isFormValid()) return;
      this.$emit('formValid', this.user);
    },
  },
  created() {
    this.setConditionsSet();
  },
});
</script>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
}
</style>
