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

    <q-item-section 
      side
      v-if="task.dueDate"
      >
      <div class="row">
        <div class="column">
          <q-icon 
            name="event" 
            size="18px" 
            class="q-mr-xs"></q-icon>
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
      <div class="row">
        <q-btn @click.stop="showEditTask = true" flat round dense color="secondary" icon="edit"></q-btn>
        <q-btn @click.stop="promptToDelete(id)" flat round dense color="negative" icon="delete"></q-btn>
      </div>
    </q-item-section>
    <q-dialog v-model="showEditTask" >
      <edit-task @close="showEditTask=false" :task="task" :id="id"></edit-task>
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["task", "id"],
  data(){
    return {
      showEditTask: false
    }
  },
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
  },
  components:{
        "edit-task": require("components/tasks/modals/editTask.vue").default
  }
};
</script>
<style>
</style>