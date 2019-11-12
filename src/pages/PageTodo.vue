<template>
  <q-page class="q-pa-md">
    <tasks-todo :tasksTodo="tasksTodo" />
    
    <hr />

    <tasks-completed :tasksCompleted="tasksCompleted" />

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
      showAddTask: false
    };
  },
  computed: {
    // tasks() {
    // return this.$store.getters["tasks/tasks"];
    // }
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"])
  },
  components: {
    task: require("components/tasks/task.vue").default,
    "add-task": require("components/tasks/modals/addTask.vue").default,
    "tasks-todo": require("components/tasks/tasksTodo.vue").default,
    "tasks-completed": require("components/tasks/tasksCompleted.vue").default
  }
};
</script>

<style>
</style>
