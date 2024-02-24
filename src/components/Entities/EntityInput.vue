<template>
  <div class="radio" v-if="field.type === 'radio'">
    <div v-for="(option, index) in field.options" :key="index" style="margin-top: 1rem">
      <RadioButton
        v-model="entity[field.key as keyof typeof entity]"
        inputId="ingredient1"
        :value="option" />
      <label for="ingredient1" style="margin-left: 0.5rem">{{ option }}</label>
    </div>
  </div>
  <div style="margin-top: 1rem" class="checkbox" v-else-if="field.type === 'checkbox'">
    <Checkbox
      v-model="entity[field.key as keyof typeof entity]"
      :inputId="`checkbox-${i}`"
      :label="field.label"
      :placeholder="field.label"
      :binary="true" />
    <label :for="`checkbox-${i}`">{{ field.label }}
      <span v-if="field.required" style="color: var(--primary-color)">{{ ' *' }}</span></label>
  </div>
  <InputGroup style="margin-top: 1rem" v-else-if="field.type === 'date'">
    <Calendar
      v-model="entity[field.key as keyof typeof entity]"
      :placeholder="field.label"
      showIcon
      :label="field.label" />
  </InputGroup>
  <InputGroup style="margin-top: 1rem" v-if="field.type === 'select'">
    <Dropdown
      v-model="entity[field.key as keyof typeof entity]"
      :label="field.label"
      :placeholder="field.label"
      :options="field.options" />
  </InputGroup>
  <InputGroup style="margin-top: 1rem" v-else-if="field.type === 'text'">
    <InputText
      :label="field.label"
      :placeholder="field.label"
      v-model="entity[field.key as keyof typeof entity]" />
  </InputGroup>
  <InputGroup style="margin-top: 1rem" v-else-if="field.type === 'number'">
    <InputNumber
      v-model="entity[field.key as keyof typeof entity]"
      :label="field.label"
      :placeholder="field.label" />
  </InputGroup>
  <InputGroup style="margin-top: 1rem" v-else-if="field.type === 'textarea'">
    <Textarea
      v-model="entity[field.key as keyof typeof entity]"
      :label="field.label"
      :placeholder="field.label" />
  </InputGroup>
</template>

<script lang="ts">
import { mapState } from 'pinia';
import useEntity from '@/store/entity';
export default {
  name: 'entity-input',
  props: {
    field: Object,
  },
  computed: {
    ...mapState(useEntity, ['entity']),
  },
};
</script>
<style scoped>
.radio {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-around;
}

.checkbox {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>
