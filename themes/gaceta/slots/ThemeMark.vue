<script setup lang="ts">
// The nameplate of a newspaper: the site name in the text face, between two ornaments of the stamp ink. No logo. Static (ADR 0005, section 12)
const props = withDefaults(defineProps<{
  size?: number
  context?: 'header' | 'footer'
}>(), {
  size: 30,
  context: 'header',
})

const site = useSite()
</script>

<template>
  <span :class="['gaceta-mark', `gaceta-mark-${props.context}`]">
    <svg
      class="gaceta-mark-orn"
      viewBox="0 0 24 12"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 6H9M15 6H24M12 2L16 6L12 10L8 6Z" />
    </svg>
    <span class="gaceta-mark-name">{{ site.name }}</span>
    <svg
      class="gaceta-mark-orn"
      viewBox="0 0 24 12"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 6H9M15 6H24M12 2L16 6L12 10L8 6Z" />
    </svg>
  </span>
</template>
