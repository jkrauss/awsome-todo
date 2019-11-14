<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 350px">
      <q-list bordered padding class="q-mb-md">
 
        <q-item-label header>Settings</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Show 12 hour time format</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle color="blue" v-model="show12HourTimeFormat"/>
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Show tasks in one list</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle color="blue" v-model="showTasksInOneList"/>
          </q-item-section>
        </q-item>

      </q-list>

      <q-list bordered padding>
 
        <q-item-label header>More</q-item-label>

        <q-item tag="label" v-ripple to="/settings/help">
          <q-item-section>
            <q-item-label>Help</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-icon name="chevron_right"></q-icon>
          </q-item-section>
        </q-item>
      
        <q-item tag="label" v-ripple @click="visitOurWebsite">
          <q-item-section>
            <q-item-label>Visit our website</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-icon name="chevron_right"></q-icon>
          </q-item-section>
        </q-item>  

        <q-item tag="label" v-ripple @click="emailUs">
          <q-item-section>
            <q-item-label>Email us</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-icon name="chevron_right"></q-icon>
          </q-item-section>
        </q-item>

      </q-list>
    </div>
  </q-page>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import { openURL } from 'quasar'
  export default {
    methods: {
      ...mapActions('settings', ['setShow12HourTimeFormat', 'setShowTasksInOneList']),
      visitOurWebsite(){
        openURL('https://www.sumbee.net')
      },
      emailUs(){
        window.location.href="mailto:mail@jonaskrauss.de?subject=Awesome Todo feedback"
      }
    },
    computed: {
      ...mapGetters('settings', ['settings']),
      show12HourTimeFormat: {
        get(){
          return this.settings.show12HourTimeFormat
        },
        set(val){
          this.setShow12HourTimeFormat(val)
        }
      },
      showTasksInOneList: {
        get(){
          return this.settings.showTasksInOneList
        },
        set(val){
          this.setShowTasksInOneList(val)
        }
      }
    }
  }
</script>

<style>
</style>
