<script setup lang="ts">
import { COLONIES } from './network'
import type { Colony } from './network'

// A small colony per category, in the category's color role. Categories are data, so any slug gets one, picked by its characters
const props = withDefaults(defineProps<{
  category: string
  /** The category's color role, from the same ranking as its tag; the core always passes it. */
  color: string
  size?: number
}>(), {
  size: 200,
})

const colony = computed<Colony>(() => {
  const sum = Array.from(props.category).reduce((total, char) => total + (char.codePointAt(0) ?? 0), 0)
  return COLONIES[sum % COLONIES.length] ?? COLONIES[0]!
})
</script>

<template>
  <svg
    class="espora-colony"
    viewBox="0 0 100 100"
    :width="props.size"
    :height="props.size"
    aria-hidden="true"
    focusable="false"
    :style="{ color: props.color }"
  >
    <path
      class="espora-colony-threads"
      :d="colony.threads"
    />
    <circle
      v-for="node in colony.nodes"
      :key="`${node.cx}-${node.cy}`"
      class="espora-colony-node"
      :cx="node.cx"
      :cy="node.cy"
      :r="node.r"
    />
    <circle
      class="espora-colony-origin"
      :cx="colony.origin.cx"
      :cy="colony.origin.cy"
      :r="colony.origin.r"
    />
  </svg>
</template>
