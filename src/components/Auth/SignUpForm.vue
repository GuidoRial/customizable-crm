<template>
  <div class="card flex justify-content-center">
    <form novalidate @submit.prevent="onSubmit">
      <Card>
        <template #title> Sign Up </template>
        <template #content>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText
              :class="{ 'p-invalid': errorMessages.firstName }"
              placeholder="First Name"
              v-model="user.firstName"
            />
            <InputGroupAddon>
              <i class="pi pi-at"></i>
            </InputGroupAddon>
            <InputText
              :class="{ 'p-invalid': errorMessages.lastName }"
              placeholder="Last Name"
              v-model="user.lastName"
            />
          </InputGroup>
          <InputGroup style="margin-top: 2rem">
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText placeholder="Username" v-model="user.username" />
            <InputGroupAddon>
              <i class="pi pi-at"></i>
            </InputGroupAddon>
            <InputText
              :class="{ 'p-invalid': errorMessages.email }"
              placeholder="Email"
              v-model="user.email"
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
              <Password
                :class="{ 'p-invalid': errorMessages.confirmPassword }"
                v-model="user.confirmPassword"
                input-id="password"
                toggleMask
              />
              <label for="password">Confirm password</label>
            </span>
          </InputGroup>
        </template>
        <template #footer>
          <div class="footer">
            <Button icon="pi pi-check" label="Save" type="submit" />
            <ErrorMessage
              v-if="errorMessageShouldBeShown"
              :errorMessage="errorMessages[currentErrorField]"
            />
          </div>
        </template>
      </Card>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import {
  fieldCannotBeEmpty,
  fieldShouldBeLessThanComparatorCharacters,
  emailIsValid,
  passwordIsValid,
  stringsShouldMatch,
  usernameIsAvailable,
} from '@/utils/validators';
import { AuthUserDTO, FieldConditions, ErrorMessages } from '@/interfaces/auth';
import useUsers from '@/store/users';
import { mapActions } from 'pinia';
import ErrorMessage from '@/components/Auth/ErrorMessage.vue';
export default defineComponent({
  name: 'sign-up-form',
  components: {
    ErrorMessage,
  },
  data() {
    return {
      currentErrorField: '' as string,
      errorMessages: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      } as ErrorMessages,
      user: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      } as AuthUserDTO,
      conditionsSet: [] as FieldConditions[],
      usernames: [] as string[],
    };
  },
  computed: {
    errorMessageShouldBeShown() {
      const errors = Object.values(this.errorMessages) as string[];
      return errors.filter((msg: string) => msg.length > 0).length;
    },
  },
  methods: {
    ...mapActions(useUsers, ['getUsernames']),
    async setUserNames() {
      const usernames = await this.getUsernames();
      this.usernames = usernames.map((u) => u.username) as string[];
    },
    setConditionsSet() {
      const conditionSet = [
        {
          field: 'firstName',
          conditions: [
            { cb: fieldCannotBeEmpty, msg: 'A first name is required' },
            {
              cb: (field: string) => fieldShouldBeLessThanComparatorCharacters(field, 15),
              msg: 'First name cannot be longer than 15 characters',
            },
          ],
        },
        {
          field: 'lastName',
          conditions: [
            { cb: fieldCannotBeEmpty, msg: 'A last name is required' },
            {
              cb: (field: string) => fieldShouldBeLessThanComparatorCharacters(field, 15),
              msg: 'Last name cannot be longer than 15 characters',
            },
          ],
        },
        {
          field: 'email',
          conditions: [
            { cb: fieldCannotBeEmpty, msg: 'An email is required' },
            {
              cb: emailIsValid,
              msg: 'Email should be valid',
            },
          ],
        },
        {
          field: 'username',
          conditions: [
            {
              cb: () => usernameIsAvailable(this.user.username, this.usernames),
              msg: 'Username already exists',
            },
          ],
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
        {
          field: 'confirmPassword',
          conditions: [
            {
              cb: fieldCannotBeEmpty,
              msg: 'You need to confirm your password before moving forwards',
            },
            {
              cb: (password: string) => stringsShouldMatch(password, this.user.password),
              msg: 'Passwords should match',
            },
          ],
        },
      ];
      this.conditionsSet = conditionSet as FieldConditions[];
    },
    getDefaultErrorMessages() {
      return {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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
  async created() {
    this.setConditionsSet();
    await this.setUserNames();
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
}
</style>
