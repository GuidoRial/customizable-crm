<template>
  <div v-for="(field, i) in fields" :key="i">
    <div
      class="header"
      :style="{ color: blueprint.metadata.map === field.label ? 'var(--primary-color)' : 'white' }"
    >
      <h3>{{ field.label }}</h3>
      <InfoIcon
        v-if="blueprint.metadata.map === field.label"
        tooltipText="This field will be used as a reference."
      />
    </div>
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
import FieldDescription from './FieldDescription.vue';
import { mapState } from 'pinia';
import useBlueprint from '@/store/blueprint';
import InfoIcon from '@/components/shared/InfoIcon.vue';
import { formatArrayWithAnd } from '@/utils/formatArrayWithAnd';
export default {
  name: 'review-step',
  computed: {
    ...mapState(useBlueprint, ['blueprint', 'fields']),
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
    formatArrayWithAnd,
  },
  components: { FieldDescription, InfoIcon },
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
