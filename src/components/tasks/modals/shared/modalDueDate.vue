<template>
  <div class="row q-mb-sm">
    <q-input
      outlined
      clearable
      :value="dueDate"
      @input="$emit('update:dueDate', $event)"
      label="Due date"
    >
      <template v-slot:append>
        <q-icon v-if="!dueDate" name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date :value="dueDate" minimal @input="$emit('update:dueDate', $event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
<script>
export default {
  props: ["dueDate"],
  methods: {}
};
</script>
<style>
</style>