<template>
  <transition
  appear
  enter-active-class="animated zoomIn"
  leave-active-class="animated zoomOut absolute-top"
  >
    <q-banner class="bg-grey-5">
      <template v-slot:avatar>
        <q-icon name="check" color="primary" />
      </template>
      No tasks to do today!
      <template v-slot:action>
        <q-btn flat color="primary" label="Add Task" @click="$root.$emit('showAddTask')"/>
      </template>
    </q-banner>
  </transition>
</template>

<script>
export default {
//TODO: insert and use showAddTaskModal instead of the quasar global event bus
}
</script>