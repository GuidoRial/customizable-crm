<template>
  <div>
    <Menubar :model="items">
      <template #start> </template>
      <template #item="{ item, props, hasSubmenu, root }">
        <a v-ripple class="flex align-items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span style="margin-left: 0.5rem">{{ item.label }}</span>
          <Badge v-if="item.badge" :value="item.badge" />
          <i
            v-if="hasSubmenu"
            style="margin-left: 0.3rem"
            :class="[
              'pi pi-angle-down text-primary',
              { 'pi-angle-down ': root, 'pi-angle-right ': !root },
            ]"
          >
          </i>
        </a>
      </template>
      <template #end>
        <div class="flex align-items-center gap-2">
          <Avatar
            label="P"
            shape="circle"
            @click="toggle"
            style="cursor: pointer"
            aria-haspopup="true"
            aria-controls="overlay_menu"
          />
          <Menu ref="menu" id="overlay_menu" :model="menu_items" :popup="true" />
        </div>
      </template>
    </Menubar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import useAuth from '@/store/auth';
import { mapActions } from 'pinia';
import { MenuItem } from 'primevue/menuitem';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'dashboard-view',
  components: {},
  methods: {
    ...mapActions(useAuth, ['logout']),
    toggle(event: any) {
      (this.$refs.menu as any).toggle(event);
    },
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'login' });
    },
  },
  data() {
    return {
      menu_items: [
        {
          label: 'Profile',
          items: [
            {
              label: 'Settings',
              icon: 'pi pi-cog',
            },
            {
              label: 'Logout',
              icon: 'pi pi-sign-out',
              command: this.handleLogout,
            },
          ],
        },
      ] as MenuItem[],
      items: [
        {
          label: 'Home',
          icon: 'pi pi-home',
          command: () => this.$router.push({ name: 'home' }),
        },
        {
          label: 'Blueprints',
          // Takes you to your blueprints (table)
          // Allows you to create, edit, delete blueprints
          icon: 'pi pi-box',
          items: [
            {
              label: 'My Blueprints',
              icon: 'pi pi-eye',
              command: () => this.$router.push({ name: 'blueprints' }),
            },
            {
              label: 'Create Blueprint',
              icon: 'pi pi-plus',
              command: () => this.$router.push({ name: 'blueprints-create' }),
            },
            {
              label: 'About Blueprints',
              icon: 'pi pi-question',
              command: () => this.$router.push({ name: 'blueprints-about' }),
            },
          ],
        },
        {
          label: 'Workbench',
          icon: 'pi pi-wrench',
        },
      ],
    };
  },
});
</script>
