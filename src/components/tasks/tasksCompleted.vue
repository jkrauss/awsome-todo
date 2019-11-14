<template>
<transition
  appear
  enter-active-class="animated zoomIn"
  leave-active-class="animated zoomOut"
>
  <div
    :class="{'q-mt-lg':!settings.showTasksInOneList}"
    >
      
      <list-header 
        :bgColor="'bg-green-6'"
        v-if="!settings.showTasksInOneList"
        >Done</list-header >
      <q-list 
        bordered 
        separator
        v-if="Object.keys(tasksCompleted).length"
        >
        <task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key"></task>
      </q-list>
  </div> 
</transition>   
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    props:["tasksCompleted"],
    components: {
      task: require("components/tasks/task.vue").default,
          "list-header": require("components/shared/listHeader.vue").default
    },
    computed:{
      ...mapGetters('settings', ['settings'])
    }    
}
</script>