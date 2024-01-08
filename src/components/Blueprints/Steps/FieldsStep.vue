<template>
  <div>
    <div v-for="(field, i) in fields" :key="i">
      <div class="header">
        <h2>Field {{ i + 1 }}</h2>
        <InfoIcon tooltipText="A text field is required." />
      </div>
      <FieldDescription
        tooltipText="
          Used to identify this field within your blueprint. i.e: Full Name, Address, Contry
        "
        label="Field Name:"
      />
      <InputGroup>
        <InputText placeholder="Field Name (i.e: Contact Name)" v-model="field.label" />
      </InputGroup>

      <FieldDescription
        tooltipText="
        Used to describe how you want to input this data, do you want two write down a name or mark a checkbox for this field
        "
        label="Field Type:"
      />

      <InputGroup>
        <Dropdown
          placeholder="Field Type (i.e: Text, Dropdown)"
          optionLabel="label"
          optionValue="value"
          :options="[
            { label: 'Text', value: 'text' },
            { label: 'Select', value: 'select' },
            { label: 'Number', value: 'number' },
            { label: 'Checkbox', value: 'checkbox' },
            { label: 'Radio', value: 'radio' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Date', value: 'date' },
          ]"
          v-model="field.type"
        />
      </InputGroup>
      <div style="margin-top: 1rem" v-if="field.type === 'select' || field.type === 'radio'">
        <FieldDescription
          tooltipText="Select and radio field types require possible values for it to work"
          :label="'Posible values for field: ' + field.label"
        />

        <InputGroup v-for="(option, index) in field.options" :key="index" style="margin-top: 1rem">
          <InputText
            :placeholder="`Possible value for field: ${field.label}`"
            v-model="field.options[index]"
          />
          <Button
            icon="pi pi-minus"
            severity="danger"
            @click="field.options?.pop()"
            :disabled="index !== field.options.length - 1 || index === 0"
          />
          <Button
            icon="pi pi-plus"
            severity="success"
            @click="field.options?.push('')"
            :disabled="index !== field.options.length - 1 || !field.options[index].length"
          />
        </InputGroup>
      </div>
      <div
        style="margin-top: 1rem"
        class="checkbox"
        v-tooltip.top="'When you use this blueprint, will this field be required?'"
      >
        <Checkbox inputId="required" name="category" :binary="true" v-model="field.required" />
        <label for="required">Required?</label>
      </div>

      <div class="button-group">
        <Button
          :disabled="i === 0 && fields.length === 1"
          label="Delete Field"
          type="button"
          class="p-button-danger"
          @click="fields.splice(i, 1)"
        />
        <Button
          v-if="i === fields.length - 1"
          :disabled="addFieldBtnDisabled(fields, i)"
          label="Add Field"
          type="button"
          class="p-button-success"
          @click="addField(fields)"
        />
      </div>

      <Divider />
    </div>
  </div>
</template>

<script lang="ts">
import { Field } from '@/interfaces/blueprints';
import FieldDescription from './FieldDescription.vue';
import useBlueprint from '@/store/blueprint';
import { mapState } from 'pinia';
import InfoIcon from '@/components/shared/InfoIcon.vue';
export default {
  name: 'fields-step',
  computed: {
    ...mapState(useBlueprint, ['blueprint', 'fields']),
    addFieldBtnDisabled(): (fields: Field[], fieldIndex: number) => boolean {
      return (fields: Field[], fieldIndex: number): boolean => {
        const selectedField = fields[fieldIndex] as Field;
        const requiresOptions = selectedField.type === 'select' || selectedField.type === 'radio';
        const thereAreEmptyOptions = selectedField.options?.some((option) => option === '');
        return (
          (requiresOptions && thereAreEmptyOptions) ||
          (requiresOptions && (selectedField?.options?.length ?? 0) < 2) ||
          selectedField.label === ''
        );
      };
    },
  },
  methods: {
    addField(fields: Field[]) {
      fields.push({
        label: '',
        type: 'text',
        options: [''],
        required: false,
      });
    },
  },
  components: { FieldDescription, InfoIcon },
};
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}
.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: var(--primary-color);
}
</style>
