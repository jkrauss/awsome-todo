<template>
    <q-banner dense inline-actions 
        class="text-white bg-orange-6 text-center list-header">
      <span class="text-bold text-subtitle1"><slot /></span>

    </q-banner>
</template>
<script>
export default {
    
}
</script>
<style>
    .list-header {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
</style>