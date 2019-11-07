<template>
  <div v-if="dueDate" class="row q-mb-sm">
    <q-input
      outlined
      clearable
      :value="dueTime"
      @input="$emit('update:dueTime', $event)"
      label="Due time"
      class="col"
    >
      <template v-slot:append>
        <q-icon v-if="!dueTime" name="access_time" class="cursor-pointer">
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-time :value="dueTime" @input="$emit('update:dueTime', $event)" />
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
<script>
export default {
  props: ["dueTime", "dueDate"]
};
</script>