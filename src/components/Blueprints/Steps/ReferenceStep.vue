<template>
  <div>
    <div class="field-description">
      <i
        class="pi pi-exclamation-circle icon"
        v-tooltip.top="
          'Select the fill that will act as a reference for this blueprint. i.e: Full Name, Address, Country. This will be used when documents created from this blueprint are loaded into a dropdown (i.e: &quot;Select a contact&quot; could show the &quot;Contact Name&quot; field or &quot;Select a company&quot; could show the &quot;Company Name field&quot;)'
        "
      />
      <p>Field that will act as a reference:</p>
    </div>

    <InputGroup>
      <Dropdown
        placeholder="Select a field"
        optionLabel="label"
        optionValue="value"
        :options="fields.map((field) => ({ label: field.label, value: field.label }))"
        v-model="blueprint.metadata.map"
      />
    </InputGroup>
  </div>
</template>

<script lang="ts">
import { Field } from '@/interfaces/blueprints';

export default {
  name: 'reference-step',
  props: {
    fields: {
      type: Array as () => Field[],
      required: true,
    },
    blueprint: {
      type: Object,
      required: true,
    },
  },
};
</script>
