<template>
  <q-item
    @click="updateTask({id: id, updates:{completed: !task.completed}})"
    v-touch-hold:1000.mouse="showEditTaskModal"
    clickable
    v-ripple
    :class="!task.completed ? 'bg-amber-2' : 'bg-green-2'"
  >
    <q-item-section side top>
      <q-checkbox :value="task.completed" class="no-pointer-events" />
    </q-item-section>

    <q-item-section>
      <q-item-label 
        :class="{'text-strikethrough': task.completed}"
        v-html="$options.filters.searchHighlight(task.name, search)"
        ></q-item-label>
    </q-item-section>

    <q-item-section side v-if="task.dueDate">
      <div class="row">
        <div class="column">
          <q-icon name="event" size="18px" class="q-mr-xs"></q-icon>
        </div>
        <div class="column">
          <q-item-label caption class="row justify-end">{{task.dueDate|niceDate}}</q-item-label>
          <q-item-label caption class="row justify-end">
            <small>{{taskDueTime}}</small>
          </q-item-label>
        </div>
      </div>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <q-btn @click.stop="showEditTaskModal" flat round dense color="secondary" icon="edit"></q-btn>
        <q-btn @click.stop="promptToDelete(id)" flat round dense color="negative" icon="delete"></q-btn>
      </div>
    </q-item-section>
    <q-dialog v-model="showEditTask">
      <edit-task @close="showEditTask=false" :task="task" :id="id"></edit-task>
    </q-dialog>
  </q-item>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { date } from "quasar";
const { addToDate } = date;
export default {
  props: ["task", "id"],
  data() {
    return {
      showEditTask: false
    };
  },
  computed:{
      ...mapState('tasks', ["search"]),
      ...mapGetters('settings', ['settings']),
      taskDueTime(){
        if(this.settings.show12HourTimeFormat){
          return date.formatDate(this.task.dueDate+" "+this.task.dueTime, 'h:mmA')
        }
        return this.task.dueTime
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
    },
    showEditTaskModal() {
      this.showEditTask = true;
    }
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, "ddd DD.MM.YYYY");
    },
    searchHighlight(value, search){
      if (search){
        let srex = new RegExp(search, 'ig')
        return value.replace(srex, (match) => {
          return '<span class="bg-yellow-6 ">'+match+'</span>'
        })
      }
      return value;
    }
  },
  components: {
    "edit-task": require("components/tasks/modals/editTask.vue").default
  }
};
</script>
<style>
</style>