<template>
  <q-page class="q-pa-md">
    <q-list 
      bordered 
      separator
      v-if="Object.keys(tasks).length"
      >
      <task v-for="(task, key) in tasks" :key="key" :task="task" :id="key"></task>
    </q-list>
    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn @click="showAddTask=true" round dense color="primary" size="24px" icon="add" />
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask=false" ></add-task>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showAddTask: true
    };
  },
  computed: {
    // tasks() {
    // return this.$store.getters["tasks/tasks"];
    // }
    ...mapGetters("tasks", ["tasks"])
  },
  components: {
    task: require("components/tasks/task.vue").default,
    "add-task": require("components/tasks/modals/addTask.vue").default
  }
};
</script>

<style>
</style>
