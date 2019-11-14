<template>
  <q-page>

    <div class="q-pa-md absolute full-width full-height column">

      <div class="row q-mb-lg">
        <search /><sort />
      </div >
      <p v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length">No search results</p>
      <q-scroll-area
        class="q-scroll-area-tasks"
      >
        <no-tasks 
        v-if="!search && !Object.keys(tasksTodo).length && !settings.showTasksInOneList" 
        ></no-tasks>
        <tasks-todo :tasksTodo="tasksTodo" v-if="Object.keys(tasksTodo).length"/>
        <tasks-completed 
          :tasksCompleted="tasksCompleted" 
          v-if="Object.keys(tasksCompleted).length"
          class="q-mb-xl"/>
      </q-scroll-area>

      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn 
          @click="showAddTask=true" 
          round 
          dense 
          color="primary" 
          size="24px" 
          icon="add" 
          class="all-pointer-events"/>
      </div>
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
    ...mapGetters("settings", ["settings"]),
    ...mapState("tasks", ["search"])
  },
  components: {
    task: require("components/tasks/task.vue").default,
    "add-task": require("components/tasks/modals/addTask.vue").default,
    "tasks-todo": require("components/tasks/tasksTodo.vue").default,
    "tasks-completed": require("components/tasks/tasksCompleted.vue").default,
    "no-tasks": require("components/tasks/noTasks.vue").default,
    "search": require("components/tasks/tools/search.vue").default,
    "sort": require("components/tasks/tools/sort.vue").default
  },
  mounted() {
    this.$root.$on('showAddTask', () => {this.showAddTask=true})
    //TODO: insert and use vuex:showAddTaskModal instead of the quasar global event bus
  }
  
};
</script>

<style>
  .q-scroll-area-tasks {
    display: flex;
    flex-grow: 1;
  }
</style>
