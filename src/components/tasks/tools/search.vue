<template>
  <q-input
    outlined
    v-select-all
    v-model="searchField"
    @keyup.esc="searchField=''"
    label="Search"
    class="col"
  >
    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { selectAll } from "src/directives/directive-select-all";
export default {
  computed: {
    ...mapState("tasks", ["search"]),
    searchField: {
      get() {
        return this.search;
      },
      set(val) {
        this.setSearch(val);
      }
    }
  },
  methods: {
    ...mapActions("tasks", ["setSearch"])
  },
  directives: {
    selectAll
  }
};
</script>