<template>
<transition
  appear
  enter-active-class="animated zoomIn"
  leave-active-class="animated zoomOut absolute-top"
>
    <div>
        <list-header :bgColor="'bg-orange-6'" >Todo</list-header >
        <q-list 
        bordered 
        separator
        v-if="Object.keys(tasksTodo).length"
        >
        <task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key"></task>
        </q-list>
    </div>
</transition>
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