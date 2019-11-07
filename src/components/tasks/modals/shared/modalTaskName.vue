<template>
        <div class="row q-mb-sm">
          <q-input 
            outlined autofocus clearable
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
export default {
    props: ["name"]
    
}
</script>
