<template>
  <div v-for="(field, i) in fields" :key="i">
    <h3>{{ field.label }}</h3>
    <FieldDescription
      :tooltipText="getTooltipTextBasedOnFieldType(field.type)"
      :label="'Field type: ' + field.type"
    />
    <FieldDescription
      v-if="field.type === 'select' || field.type === 'radio'"
      tooltipText="When you choose select or radio as a field type you need to provide possible values for it to work"
      :label="'The possible values for this field are: ' + formatArrayWithAnd(field.options)"
    />

    <FieldDescription
      tooltipText="When you use this blueprint, will this field be required?"
      :label="'This field is ' + (field.required ? 'required' : 'not required')"
    />

    <Divider v-if="i < fields.length - 1" />
  </div>
</template>
<script lang="ts">
import { Field } from '@/interfaces/blueprints';
import FieldDescription from './FieldDescription.vue';
import Textarea from 'primevue/textarea';
export default {
  name: 'review-step',
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
  computed: {
    getTooltipTextBasedOnFieldType() {
      return (type: string) => {
        const config: { [key: string]: string } = {
          text: 'A plain text input will be rendered when you use this blueprint',
          select:
            'A clasic dropdown menu with the options you provide will be rendered when you use this blueprint',
          radio:
            'A radio button group with the options you provide will be rendered when you use this blueprint',
          number: 'A number input will be rendered when you use this blueprint',
          date: 'A date input will be rendered when you use this blueprint',
          textarea:
            'A text area to input large amounts of text will be rendered when you use this blueprint',
        };
        return config[type];
      };
    },
  },
  methods: {
    formatArrayWithAnd(arr: string[]) {
      if (arr.length === 1) return arr[0];
      return `${arr.slice(0, -1).join(', ')} and ${arr.slice(-1)}`;
    },
  },
  components: { FieldDescription },
};
</script>
