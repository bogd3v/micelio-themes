<script setup lang="ts">
// The rule a compositor sets at the foot of a page: a thick and a thin line round a lozenge. Only the columns footer renders it. Static
defineProps<{
  placement?: 'footer'
}>()
</script>

<template>
  <div
    class="gaceta-divider"
    aria-hidden="true"
  >
    <svg
      class="gaceta-divider-orn"
      viewBox="0 0 24 12"
      focusable="false"
    >
      <path d="M12 1L17 6L12 11L7 6Z" />
    </svg>
  </div>
</template>
