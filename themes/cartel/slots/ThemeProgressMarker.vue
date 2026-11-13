<script setup lang="ts">
// A square of the first ink rides the track by the --myc-read custom property of .myc-progress (CSS only), so `progress` is not read
defineProps<{
  progress?: number
}>()
</script>

<template>
  <div class="myc-progress-track">
    <span class="cartel-progress-block" />
  </div>
</template>
