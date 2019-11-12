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
import { mapActions } from "vuex";
export default {
  props:["task", "id"],
  data() {
    return {
      taskToSubmit: {
      }
    };
  },
  methods: {
    ...mapActions("tasks", ["updateTask"]),
    submitForm() {
      this.submitTask();
    },
    submitTask() {
      this.updateTask({
        id: this.id,
        updates: this.taskToSubmit
      });
      this.$emit("close");
    }
  },
  components: {
    "modal-header": require("components/tasks/modals/shared/modalHeader.vue")
      .default,
    "modal-task-name": require("components/tasks/modals/shared/modalTaskName.vue")
      .default,
    "modal-due-date": require("components/tasks/modals/shared/modalDueDate.vue")
      .default,
    "modal-due-time": require("components/tasks/modals/shared/modalDueTime.vue")
      .default,
    "modal-buttons": require("components/tasks/modals/shared/modalbuttons.vue")
      .default
  },
  mounted() {
      this.taskToSubmit = Object.assign({}, this.task)
  }
};
</script>
<style>
</style>