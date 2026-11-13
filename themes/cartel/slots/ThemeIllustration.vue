<script setup lang="ts">
import { PRINTS } from './press'
import type { PrintShape } from './press'

// Two plates that overlap, the first in the category's color role. Categories are data, so any slug gets a print, picked by its characters
const props = withDefaults(defineProps<{
  category: string
  /** The category's color role, from the same ranking as its tag; the core always passes it. */
  color: string
  size?: number
}>(), {
  size: 200,
})

// A page shows one illustration per category, so the id of the halftone pattern is unique per instance
const uid = useId()

const print = computed<readonly PrintShape[]>(() => {
  const sum = Array.from(props.category).reduce((total, char) => total + (char.codePointAt(0) ?? 0), 0)
  return PRINTS[sum % PRINTS.length] ?? PRINTS[0]!
})
</script>

<template>
  <svg
    class="cartel-print"
    viewBox="0 0 100 100"
    :width="props.size"
    :height="props.size"
    aria-hidden="true"
    focusable="false"
    :style="{ color: props.color }"
  >
    <defs>
      <pattern
        :id="`${uid}-color`"
        class="cartel-print-color"
        width="5"
        height="5"
        patternUnits="userSpaceOnUse"
      >
        <circle
          cx="2.5"
          cy="2.5"
          r="1.5"
        />
      </pattern>
      <pattern
        :id="`${uid}-key`"
        class="cartel-print-key"
        width="5"
        height="5"
        patternUnits="userSpaceOnUse"
      >
        <circle
          cx="2.5"
          cy="2.5"
          r="1.5"
        />
      </pattern>
    </defs>
    <template
      v-for="shape in print"
      :key="shape.d"
    >
      <path
        v-if="shape.plate === 'color-tone'"
        class="cartel-print-plate"
        :d="shape.d"
        :fill="`url(#${uid}-color)`"
      />
      <path
        v-else-if="shape.plate === 'key-tone'"
        class="cartel-print-plate"
        :d="shape.d"
        :fill="`url(#${uid}-key)`"
      />
      <path
        v-else
        :class="['cartel-print-plate', shape.plate === 'key' ? 'cartel-print-key' : 'cartel-print-color']"
        :d="shape.d"
      />
    </template>
  </svg>
</template>
