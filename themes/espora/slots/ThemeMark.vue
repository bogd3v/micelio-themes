<script setup lang="ts">
import { NETWORK_NODES, NETWORK_ORIGIN, NETWORK_THREADS } from './network'

// The Micelio symbol in one ink (the core asks for less than 64px), then the site name as text. Static (ADR 0005, section 12)
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
  <span :class="['espora-mark', `espora-mark-${props.context}`]">
    <svg
      class="espora-mark-glyph"
      viewBox="0 0 320 320"
      :width="props.size"
      :height="props.size"
      aria-hidden="true"
      focusable="false"
    >
      <g class="espora-mark-threads">
        <path
          v-for="thread in NETWORK_THREADS"
          :key="thread"
          :d="thread"
        />
      </g>
      <circle
        v-for="node in NETWORK_NODES"
        :key="`${node.cx}-${node.cy}`"
        :cx="node.cx"
        :cy="node.cy"
        :r="node.r"
      />
      <circle
        :cx="NETWORK_ORIGIN.cx"
        :cy="NETWORK_ORIGIN.cy"
        :r="NETWORK_ORIGIN.r"
      />
    </svg>
    <span class="espora-mark-name">{{ site.name }}</span>
  </span>
</template>
