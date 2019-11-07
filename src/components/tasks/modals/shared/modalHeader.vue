<template>
    <q-card-section class="row">
        <div class="text-h6"><slot /></div>
        <q-space />
        <q-btn dense flat round icon="close" v-close-popup />
    </q-card-section>
</template>
<script>
export default {
    
}
</script>
