<script setup lang="ts">
// One thread across the footer, from an origin node to three smaller ones. Decorative and static
defineProps<{
  placement?: 'footer'
}>()
</script>

<template>
  <svg
    class="espora-divider"
    viewBox="0 0 1120 40"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <path
      class="espora-divider-thread"
      d="M-400 20C-250 30 -100 30 40 22C160 6 250 34 380 20S620 6 760 22S960 32 1080 14C1220 4 1380 24 1520 18"
    />
    <ellipse
      class="espora-divider-origin"
      cx="40"
      cy="22"
      rx="9"
      ry="9"
    />
    <ellipse
      class="espora-divider-node"
      cx="380"
      cy="20"
      rx="6"
      ry="6"
    />
    <ellipse
      class="espora-divider-node"
      cx="760"
      cy="22"
      rx="5"
      ry="5"
    />
    <ellipse
      class="espora-divider-node"
      cx="1080"
      cy="14"
      rx="7"
      ry="7"
    />
  </svg>
</template>
