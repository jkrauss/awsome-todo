<template>
<div>
    <list-header >Todo</list-header >
    <q-list 
      bordered 
      separator
      v-if="Object.keys(tasksTodo).length"
      >
      <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key"></task>
    </q-list>
</div>
</template>
<script>
export default {
    props:["tasksTodo"],
    components: {
        task: require("components/tasks/task.vue").default,
        "list-header": require("components/shared/listHeader.vue").default
    }
    
}
</script>