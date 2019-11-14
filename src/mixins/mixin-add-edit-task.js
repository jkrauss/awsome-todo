export default {
    methods: {
        submitForm() {
            this.submitTask();
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
      }
}