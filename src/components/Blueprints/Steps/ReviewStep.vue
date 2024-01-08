<template>
  <div>
    <h2>Basic Info</h2>
    <p>
      Your blueprint name is <span style="color: var(--primary-color)">{{ blueprint.name }}</span
      >.
    </p>
    <p v-if="blueprint.description.length">You described it as "{{ blueprint.description }}"</p>
    <p v-else>You didn't provide a description for this blueprint</p>
    <p v-if="blueprint.metadata.canBeReferenced">
      This blueprint can be used as a reference. The field that will act as a reference is "<span
        style="color: var(--primary-color)"
        >{{ blueprint.metadata.map }} </span
      >".
    </p>
    <Divider />
    <h2>Fields</h2>
    <ReviewField />
  </div>
</template>

<script lang="ts">
import ReviewField from './ReviewField.vue';
import { mapState } from 'pinia';
import useBlueprint from '@/store/blueprint';

export default {
  name: 'review-step',
  computed: {
    ...mapState(useBlueprint, ['blueprint', 'fields']),
  },
  components: { ReviewField },
};
</script>
