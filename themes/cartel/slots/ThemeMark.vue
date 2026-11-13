<script setup lang="ts">
// Two inks out of register under a registration cross, then the site name as text. Static (ADR 0005, section 12)
const props = withDefaults(defineProps<{
  size?: number
  context?: 'header' | 'footer'
}>(), {
  size: 40,
  context: 'header',
})

const site = useSite()
</script>

<template>
  <span :class="['cartel-mark', `cartel-mark-${props.context}`]">
    <svg
      class="cartel-mark-glyph"
      viewBox="0 0 64 64"
      :width="props.size"
      :height="props.size"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        class="cartel-mark-second"
        cx="37"
        cy="37"
        r="21"
      />
      <circle
        class="cartel-mark-first"
        cx="27"
        cy="27"
        r="21"
      />
      <path
        class="cartel-mark-cross"
        d="M27 0V58M0 27H58"
      />
    </svg>
    <span class="cartel-mark-name">{{ site.name }}</span>
  </span>
</template>
