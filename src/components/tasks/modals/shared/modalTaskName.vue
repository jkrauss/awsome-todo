<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      autofocus
      v-select-all
      clearable
      :value="name"
      @input="$emit('update:name', $event)"
      label="Task name"
      class="col"
      ref="name"
      :rules="[val => !!val || 'Field is required']"
    />
  </div>
</template>
<script>
import { selectAll } from "src/directives/directive-select-all";
export default {
  props: ["name"],
  directives: {
    selectAll
  }
};
</script>
