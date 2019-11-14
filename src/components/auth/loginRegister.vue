<template>
  <q-form @submit.stop="onSubmit" class="q-gutter-md">
    <q-banner class="bg-grey-3">
      <template v-slot:avatar>
        <q-icon name="account_circle" color="primary" />
      </template>
      <slot />
    </q-banner>
    <q-input
      outlined
      v-model="formData.email"
      label="Email"
      stack-label
      type="email"
      :rules="[ val => isValidEmail(val) || 'Please enter a valid email-address']"
      lazy-rules
    />

    <q-input
      outlined
      v-model="formData.password"
      label="Password"
      stack-label
      type="password"
      :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters']"
      lazy-rules
    />

    <div class="row">
      <q-space />
      <q-btn label="Register" type="submit" color="primary" />
    </div>
  </q-form>
</template>
<script>
export default {
  data() {
    return {
      formData: { email: "", password: "" }
    };
  },
  methods: {
    onSubmit() {
      console.log(
        "submit " + this.tab + ": ",
        this.formData.email,
        this.formData.password
      );
    },
    isValidEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
  props: ["tab"]
};
</script>