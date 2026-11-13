<script setup lang="ts">
import {
  NETWORK_FINE_NODES,
  NETWORK_FINE_THREADS,
  NETWORK_NODES,
  NETWORK_ORIGIN,
  NETWORK_RINGS,
  NETWORK_THREADS,
} from './network'

// The mark grown outward: finer threads and smaller nodes from a firm origin. Decorative and static; the caller's class gives the box
const props = withDefaults(defineProps<{
  compact?: boolean
}>(), {
  compact: false,
})
</script>

<template>
  <div
    :class="['espora-hero', { 'espora-hero-compact': props.compact }]"
    aria-hidden="true"
  >
    <svg
      class="espora-hero-art"
      viewBox="-80 -10 510 370"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <g class="espora-hero-rings">
        <circle
          v-for="ring in NETWORK_RINGS"
          :key="ring"
          :cx="NETWORK_ORIGIN.cx"
          :cy="NETWORK_ORIGIN.cy"
          :r="ring"
        />
      </g>
      <g class="espora-hero-fine">
        <path
          v-for="thread in NETWORK_FINE_THREADS"
          :key="thread"
          :d="thread"
        />
      </g>
      <g class="espora-hero-threads">
        <path
          v-for="thread in NETWORK_THREADS"
          :key="thread"
          :d="thread"
        />
      </g>
      <g class="espora-hero-nodes">
        <circle
          v-for="node in NETWORK_NODES"
          :key="`${node.cx}-${node.cy}`"
          :cx="node.cx"
          :cy="node.cy"
          :r="node.r"
        />
      </g>
      <g class="espora-hero-buds">
        <circle
          v-for="node in NETWORK_FINE_NODES"
          :key="`${node.cx}-${node.cy}`"
          :cx="node.cx"
          :cy="node.cy"
          :r="node.r"
        />
      </g>
      <circle
        class="espora-hero-origin"
        :cx="NETWORK_ORIGIN.cx"
        :cy="NETWORK_ORIGIN.cy"
        :r="NETWORK_ORIGIN.r"
      />
    </svg>
  </div>
</template>
