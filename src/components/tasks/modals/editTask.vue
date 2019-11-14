<template>
  <q-card>
    <modal-header>Edit Task</modal-header>

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
  props:["task", "id"],
  data() {
    return {
      taskToSubmit: {
      }
    };
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),

    submitTask() {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      });
      this.$emit("close");
    }
  },
  mounted() {
      this.taskToSubmit = Object.assign({}, this.task)
  }
};
</script>
<style>
</style>