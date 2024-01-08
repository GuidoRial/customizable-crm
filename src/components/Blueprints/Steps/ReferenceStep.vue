<template>
  <div>
    <FieldDescription
      tooltipText='Select the fill that will act as a reference for this blueprint. i.e: Full Name, Address, Country. This will be used when documents created from this blueprint are loaded into a dropdown (i.e: "Select a contact" could show the "Contact Name" field or "Select a company" could show the "Company Name field")'
      label="Field that will act as a reference:"
    />

    <InputGroup>
      <Dropdown
        placeholder="Select a field"
        optionLabel="label"
        optionValue="value"
        :options="
          fields
            .filter(({ type }) => type === 'text')
            .map((field) => ({ label: field.label, value: field.label }))
        "
        v-model="blueprint.metadata.map"
      />
    </InputGroup>
  </div>
</template>

<script lang="ts">
import useBlueprint from '@/store/blueprint';
import { mapState } from 'pinia';
import FieldDescription from './FieldDescription.vue';
export default {
  name: 'reference-step',
  computed: {
    ...mapState(useBlueprint, ['blueprint', 'fields']),
  },
  components: { FieldDescription },
};
</script>
