<template>
  <q-card>
    <modal-header>Add Task</modal-header>

    <q-form @submit.prevent="submitForm">
      <q-card-section>
        <modal-task-name :name.sync="taskToSubmit.name"></modal-task-name>
        <modal-due-date :dueDate.sync="taskToSubmit.dueDate"></modal-due-date>
        <modal-due-time :dueTime.sync="taskToSubmit.dueTime" :dueDate="taskToSubmit.dueDate"></modal-due-time>
      </q-card-section>

      <modal-buttons></modal-buttons>

      <!-- <pre>{{taskToSubmit}}</pre> -->
    </q-form>
  </q-card>
</template>
<script>
import mixinAddEditTask from 'src/mixins/mixin-add-edit-task'
import { mapActions } from "vuex";
export default {
  mixins: [mixinAddEditTask],
  data() {
    return {
      taskToSubmit: {
        name: "",
        dueDate: "",
        dueTime: "",
        completed: false
      }
    };
  },
  methods: {
    ...mapActions("tasks", ["addTask"]),

    submitTask() {
      this.addTask(this.taskToSubmit);
      this.$emit("close");
    }
  }
};
</script>
<style>
</style>