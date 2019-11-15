<template>
  <q-page padding>
    <div class="row">
      <q-space />
      <q-card class="auth-tabs">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="login" label="Login" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <login-register :tab="tab">Login to see your todos anywhere!&nbsp;&nbsp;&nbsp;&nbsp;</login-register>
          </q-tab-panel>

          <q-tab-panel name="register">
            <login-register :tab="tab">Register to see your todos anywhere!</login-register>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      tab: "login"
    };
  },
  components: {
    "login-register": require("components/auth/loginRegister.vue").default
  }
};
</script>
<style scoped>
.auth-tabs {
  min-width: 50vmin;
  max-width: 50vmax;
  margin: 0 auto;
}
</style>