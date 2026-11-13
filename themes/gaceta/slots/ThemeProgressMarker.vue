<script setup lang="ts">
// A printer's manicule rides the reading bar; the core moves the track by --myc-read (CSS only), so `progress` is not read
defineProps<{
  progress?: number
}>()
</script>

<template>
  <div class="myc-progress-track">
    <svg
      class="gaceta-manicule"
      viewBox="0 0 28 14"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 3H5V11H0ZM6 3.5H13L15 2H27.2Q28 2 28 3.5Q28 5 27.2 5H17V6H19.5Q20.5 6 20.5 7Q20.5 8 19.5 8H17V9H19Q20 9 20 10Q20 11 19 11H17V12H18.4Q19.4 12 19.4 12.8Q19.4 13.6 18.4 13.6H11Q6 13.6 6 10.5Z" />
    </svg>
  </div>
</template>
