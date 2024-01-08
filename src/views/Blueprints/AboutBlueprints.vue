<template>
  <div class="about-blueprints">
    <div class="header">
      <h1>About blueprints</h1>
    </div>
    <div class="panel-container">
      <Panel class="blueprint-panel" header="What is a blueprint anyways?" toggleable>
        <p style="text-align: justify">
          In a CRM you usually have some sort of "Contact" entity that you can use to keep track of
          your customers, a "Company" entity that you can use to keep track of your customers'
          companies, a "Deal" entity that you can use to keep track of your deals, etc. This CRM
          being a fully customizable one allows you to create your own entities and use them as you
          see fit. Therefore you need to tell us what your entities are made of, and that's where
          blueprints come in.

          <br />
          <Divider />
          A blueprint is a template that you can use to create documents. For example, if you have a
          blueprint called "Contact" you can create a document called "John Doe" and fill it with
          the information you have about John Doe. You can also create a blueprint called "Company"
          and reference the "Contact" blueprint in it so when you create a document called "Google"
          you can select the "Contact" blueprint and select "John Doe" as the contact for Google.
        </p>
      </Panel>
    </div>
    <div class="header">
      <h1>How do blueprints work?</h1>
    </div>
    <Timeline :value="events" align="alternate" class="customized-timeline">
      <template>
        <span class="card-icon" :style="{ backgroundColor: 'var(--primary-color)' }"> 1 </span>
      </template>
      <template #content="slotProps">
        <Card class="mt-3">
          <template #title>
            {{ slotProps.item.title }}
          </template>
          <template #subtitle>
            {{ slotProps.item.subtitle }}
          </template>
          <template #content>
            <p class="description">
              {{ slotProps.item.description }}
            </p>
          </template>
        </Card>
      </template>
    </Timeline>
    <Button
      label="Create Blueprint"
      @click="$router.push({ name: 'blueprints-create' })"
      style="margin-top: 1rem"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'blueprints-about',
  components: {},
  data() {
    return {
      events: [
        {
          title: 'Step 1',
          subtitle: 'Gathering the basic information',
          description:
            'The very first step of the blueprint creation process. Here you tell us the name of the blueprint, a short description of what it does and whether or not it can be used as a reference for other blueprints. So if your blueprint is called "Contact" and it can be used as a reference, you can create a blueprint called "Company" and reference the "Contact" blueprint in it.',
        },
        {
          title: 'Step 2',
          subtitle: 'Field creation',
          description:
            "At this point, you'll need to tell us what your blueprint is made of. So if your contact has a Name (text input), Date of Birth (date input), State of Residency (dropdown input) you'll have to tell us all about it.",
        },
        {
          title: 'Step 3 (optional)',
          subtitle: 'Referencing this blueprint',
          description:
            'If your blueprint can be used as a reference, you\'ll need to tell us which field will be used as a reference. So if your blueprint is called "Contact" and it can be used as a reference, you can create a blueprint called "Company" and reference the "Contact" blueprint in it by selecting the "Name" field so when you want to reference it you\'ll see the name of the contact in a dropdown menu.',
        },
        {
          title: 'Step 4',
          subtitle: 'Review',
          description: 'Review your blueprint and create it.',
        },
      ],
    };
  },
});
</script>
<style lang="scss" scoped>
@media screen and (max-width: 960px) {
  ::v-deep(.customized-timeline) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row;

      .p-timeline-event-content {
        text-align: left;
      }
    }

    .p-timeline-event-opposite {
      flex: 0;
    }
  }
}
</style>

<style scoped>
.description:nth-child(even) {
  text-align: left;
}
.about-blueprints {
  margin: 1rem;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary-color);
}
.card-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  color: #fff;
}
.panel-container {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.blueprint-panel {
  width: 80rem;
}
</style>
