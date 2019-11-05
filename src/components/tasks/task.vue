<template>
  <q-item
    @click="updateTask({id: id, updates:{completed: !task.completed}})"
    clickable
    v-ripple
    :class="!task.completed ? 'bg-amber-2' : 'bg-green-2'"
  >
    <q-item-section side top>
      <q-checkbox :value="task.completed" class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <q-item-label :class="{'text-strikethrough': task.completed}">{{task.name}}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <div class="column">
          <q-icon name="event" size="18px" class="q-mr-xs"></q-icon>
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">{{task.dueDate}}</q-item-label>
          <q-item-label caption class="row justify-end">
            <small>{{task.dueTime}}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <q-btn @click.stop="promptToDelete(id)" flat round dense color="negative" icon="delete"></q-btn>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["task", "id"],
  methods: {
    ...mapActions("tasks", ["updateTask", "deleteTask"]),
    promptToDelete(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Delete this task?",
          ok: {
            color: "primary"
          },
          cancel: {
            color: "negative"
          },
          persistent: true
        })
        .onOk(() => {
          //console.log(">>>> OK");
          this.deleteTask(id);
        });
    }
  }
};
</script>
<style>
</style>