<template>
  <div>
    <InputGroup>
      <InputText placeholder="Name" v-model="blueprint.name" />
    </InputGroup>
    <Textarea
      v-model="blueprint.description"
      placeholder="Description"
      style="margin-top: 1rem"
      autoResize
      rows="5"
      cols="81"
    />

    <div style="margin-top: 1rem" class="checkbox">
      <Checkbox
        inputId="key"
        name="category"
        :binary="true"
        v-model="blueprint.metadata.canBeReferenced"
      />
      <label for="key">Can this blueprint be used as a reference?</label>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'basic-info-step',
  props: {
    blueprint: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
</style>
