<template>
  <q-select
    filled
    v-model="sortBy"
    :options="options"
    label="sort by"
    class="col q-ml-sm"
    stack-label
    emit-value
    map-options
  />
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      options: [
        {
          label: "Name",
          value: "name"
        },
        {
          label: "Date",
          value: "dueDate"
        }
      ]
    };
  },
  computed: {
    ...mapState("tasks", ["sort"]),
    sortBy: {
      get() {
        return this.sort;
      },
      set(val) {
        this.setSort(val);
      }
    }
  },
  methods: {
    ...mapActions("tasks", ["setSort"])
  }
};
</script>
import {mapState} from 'vuex'
<style scoped>
.q-select {
  flex: 0 0 112px;
}
</style>