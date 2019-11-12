<template>
<div class="q-mt-lg">
    
    <list-header :bgColor="'bg-green-6'">Done</list-header >
    <q-list 
      bordered 
      separator
      v-if="Object.keys(tasksCompleted).length"
      >
      <task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key"></task>
    </q-list>
</div>    
</template>
<script>
export default {
    props:["tasksCompleted"],
  components: {
    task: require("components/tasks/task.vue").default,
        "list-header": require("components/shared/listHeader.vue").default
  }
    
}
</script>