<template>
  <v-list nav>
    <v-list-item
      link
      :to="view.link"
      v-for="view in list"
      :key="view.title"
    >
      <v-list-item-icon>
        <cta-icon color="white">
          {{ view.icon }}
        </cta-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <div class="text-subtitle-1">{{ view.title }}</div>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  components: {
    ctaIcon: () => import('../Icon')
  },
  computed: {
    list() {
      const isAdmin = this.$store.getters['users/isCurrentAdmin'];
      return this.$options.views.filter(view => !view.admin || isAdmin);
    }
  },
  created() {
    // static links to views
    this.$options.views = [
      {
        title: 'Submit',
        icon: 'mdi-form-textbox',
        link: '/submit',
        admin: false
      },
      {
        title: 'Announcements',
        icon: 'mdi-newspaper',
        link: '/announcements',
        admin: false
      },
      {
        title: 'Admin',
        icon: 'mdi-gavel',
        link: '/admin',
        admin: true
      }
    ];
  }
};
</script>

