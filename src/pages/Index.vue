<template>
  <q-page padding>
    <input v-model="message" 
      @keyup.esc="clearMessage" 
      @keyup.enter="alertMessage"
    />
    <button @click="clearMessage">Clear</button>

    <h5 
      v-if="message.length"
      class="border-grey" > 
        {{ message }} 
    </h5>
    <h6 v-else>
      No message love 😸 🤡
    </h6>

  </q-page>
</template>

<script>
export default {
  data(){
    return {
      message: "I love Quasar!"
    }
  },
  methods: {
    clearMessage() {
      this.message = ""
    },
    alertMessage(){
      alert(this.message)
    }

  }
}
</script>

<style>
  .border-grey {
    border: 1px solid gray;
  }
</style>
