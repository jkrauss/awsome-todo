<template>
  <q-card>
<modal-header >
  Add Task
</modal-header>

    <q-form @submit.prevent="submitForm">

      <q-card-section>
        <modal-name :name.sync="taskToSubmit.name"></modal-name>

        <div class="row q-mb-sm">
          <q-input 
            outlined 
            clearable 
            v-model="taskToSubmit.dueDate" 
            label="Due date"
            >
            <template v-slot:append>
              <q-icon v-if="!taskToSubmit.dueDate" name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="taskToSubmit.dueDate"
                    minimal
                    @input="() => $refs.qDateProxy.hide()"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div 
          v-if="taskToSubmit.dueDate"
          class="row q-mb-sm">
          <q-input outlined clearable v-model="taskToSubmit.dueTime" label="Due time" class="col">
            <template v-slot:append>
              <q-icon v-if="!taskToSubmit.dueTime" name="access_time" class="cursor-pointer">
                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="taskToSubmit.dueTime" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>
    
    <q-card-actions align="right">
      <q-btn label="Save" color="primary" type="submit" />
    </q-card-actions>
    <pre>{{taskToSubmit}}</pre>
      </q-form>
  </q-card>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
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
      ...mapActions('tasks', ['addTask']),
      submitForm() {
        this.submitTask()
      },
      submitTask(){
        this.addTask(this.taskToSubmit);
        this.$emit('close')
      }
    },
    components:{
      'modal-header': require('components/tasks/modals/shared/modalHeader.vue').default,
      'modal-name': require('components/tasks/modals/shared/modalName.vue').default
    }
  };
</script>
<style>
</style>