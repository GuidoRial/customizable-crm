<template>
  <CreateLayout>
    <Title title="My Blueprints" />
    <div class="card">
      <DataTable
        :expandedRows="expandedRows"
        :value="blueprints"
        dataKey="_id"
        tableStyle="min-width: 60rem"
      >
        <template #header>
          <div class="flex flex-wrap justify-content-end gap-2">
            <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
            <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
          </div>
        </template>
        <Column expander style="width: 5rem" />
        <Column field="name" header="Name" sortable />
        <Column field="description" header="Description" />
        <Column header="Can Be Referenced">
          <template #body="slotProps">
            <div class="checkbox-container">
              <Checkbox disabled :binary="true" v-model="slotProps.data.metadata.canBeReferenced" />
            </div>
          </template>
        </Column>
        <Column header="Referenced By Field">
          <template #body="slotProps">
            <p>{{ convert_to_normal_text(slotProps.data.metadata.map) }}</p>
          </template>
        </Column>
        <Column header="Actions">
          <template #body="slotProps">
            <div class="button-group">
              <Button
                icon="pi pi-pencil"
                class="p-button"
                text
                raised
                @click="
                  $router.push({ name: 'edit-blueprint', params: { id: slotProps.data._id } })
                "
              />
              <Button icon="pi pi-trash" class="p-button-danger" text raised />

              <Button
                icon="pi pi-wrench"
                class="p-button"
                text
                raised
                @click="
                  $router.push({ name: 'workbench', query: { blueprint: slotProps.data._id } })
                "
              />
            </div>
          </template>
        </Column>
        <template #expansion="slotProps">
          <div class="p-3">
            <h5>Fields</h5>
            <DataTable :value="slotProps.data.fields">
              <Column field="label" header="Name" sortable></Column>
              <Column header="Required?">
                <template #body="slotProps">
                  <div class="checkbox-container">
                    <Checkbox disabled :binary="true" v-model="slotProps.data.required" />
                  </div>
                </template>
              </Column>
              <Column field="type" header="Type" sortable></Column>
              <Column field="options" header="Options" sortable>
                <template #body="slotProps">
                  <div class="chips" v-if="slotProps.data.options.length">
                    <Chip v-for="(option, i) in slotProps.data.options" :key="i" :label="option" />
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </template>
      </DataTable>
      <Toast />
    </div>
  </CreateLayout>
</template>

<script lang="ts">
import Title from '@/components/shared/Title.vue';
import useBlueprint from '@/store/blueprint';
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue';
import { convert_to_normal_text } from '@/utils/textFormatters';
import CreateLayout from '@/components/shared/CreateLayout.vue';
export default defineComponent({
  name: 'blueprints-view',
  components: { Title, CreateLayout },
  computed: {
    ...mapState(useBlueprint, ['blueprints']),
  },
  methods: {
    ...mapActions(useBlueprint, ['getBlueprints']),
    convert_to_normal_text,

    expandAll() {
      this.expandedRows = this.blueprints.reduce((acc: any, p: any) => {
        acc[p._id] = true;
        return acc;
      }, {});
    },

    collapseAll() {
      this.expandedRows = [];
    },
  },
  async created() {
    await this.getBlueprints();
  },

  data() {
    return {
      expandedRows: [] as any,
    };
  },
});
</script>

<style scoped>
.checkbox-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}
</style>
