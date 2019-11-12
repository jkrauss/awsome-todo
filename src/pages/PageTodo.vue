<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-lg">
      <search />
    </div >
    <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">No search results</p>
    <no-tasks 
      v-if="!search && !Object.keys(tasksTodo).length" 
      ></no-tasks>
    <tasks-todo :tasksTodo="tasksTodo" v-if="Object.keys(tasksTodo).length"/>
    <tasks-completed :tasksCompleted="tasksCompleted" v-if="Object.keys(tasksCompleted).length"/>

    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn @click="showAddTask=true" round dense color="primary" size="24px" icon="add" />
    </div>

    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask=false" ></add-task>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
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
    ...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
    ...mapState("tasks", ["search"])
  },
  components: {
    task: require("components/tasks/task.vue").default,
    "add-task": require("components/tasks/modals/addTask.vue").default,
    "tasks-todo": require("components/tasks/tasksTodo.vue").default,
    "tasks-completed": require("components/tasks/tasksCompleted.vue").default,
    "no-tasks": require("components/tasks/noTasks.vue").default,
    "search": require("components/tasks/tools/search.vue").default
  },
  mounted() {
    this.$root.$on('showAddTask', () => {this.showAddTask=true})
    //TODO: insert and use vuex:showAddTaskModal instead of the quasar global event bus
  }
  
};
</script>

<style>
</style>
