<template>
  <q-page class="q-pa-md">
    <p>Todo Page</p>
    <q-list bordered separator>

      <q-item 
        v-for="task in tasks"
        :key="task.id"
        @click="task.completed=!task.completed"
        clickable
        v-ripple
        :class="!task.completed ? 'bg-amber-2' : 'bg-green-2'" >
        <q-item-section side top>
          <q-checkbox v-model="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label
          :class="{'text-strikethrough': task.completed}"
          >{{task.name}}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <div class="column" >
              <q-icon 
                name="event"
                size="18px"
                class="q-mr-xs"></q-icon>
            </div>
            <div class="column">
              <q-item-label 
                caption
                class="row justify-end">{{task.dueDate}}</q-item-label>
              <q-item-label 
              caption
              class="row justify-end"><small>{{task.dueTime}}</small></q-item-label>
            </div>
          </div>
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>

  export default {
    data(){
      return {
        tasks: [
          {
            id: 1,
            name: 'Go to shop',
            completed: false,
            dueDate: '2019-10-05',
            dueTime: '15:30'
          },
          {
            id: 2,
            name: 'Get bananas',
            completed: false,
            dueDate: '2019-11-02',
            dueTime: '17:30'
          },
          {
            id: 3,
            name: 'Get apples',
            completed: false,
            dueDate: '2019-11-04',
            dueTime: '13:00'
          },
          
        ]
      }
    }

  }
</script>

<style>
</style>
