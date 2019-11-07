<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Add Task</div>
      <q-space />
      <q-btn dense flat round icon="close" v-close-popup />
    </q-card-section>

    <q-form @submit.prevent="submitForm">

      <q-card-section>
        <div class="row q-mb-sm">
          <q-input 
            outlined autofocus clearable
            v-model="taskToSubmit.name" 
            label="Task name" 
            class="col" 
            :rules="[val => !!val || 'Field is required']"
            />
        </div>

        <div class="row q-mb-sm">
          <q-input outlined clearable v-model="taskToSubmit.dueDate" label="Due date">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
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
              <q-icon name="access_time" class="cursor-pointer">
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
    }
  };
</script>
<style>
</style>