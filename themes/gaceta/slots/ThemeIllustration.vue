<script setup lang="ts">
import { vignetteFor } from './ornaments'

// A vignette of one ink per category. Categories are data, so the vignette follows the category's color role, which the core always passes;
// a slug outside the list (the neutral color) gets a dinkus. Static (ADR 0005, section 12)
const props = withDefaults(defineProps<{
  category: string
  /** The category's color role, from the same ranking as its tag; the core always passes it. */
  color: string
  size?: number
}>(), {
  size: 200,
})

const strokes = computed(() => vignetteFor(props.color))
</script>

<template>
  <svg
    class="gaceta-vignette"
    viewBox="0 0 100 100"
    :width="props.size"
    :height="props.size"
    aria-hidden="true"
    focusable="false"
    :style="{ color: props.color }"
  >
    <path
      v-for="(stroke, index) in strokes"
      :key="index"
      :class="stroke.kind === 'fill' ? 'gaceta-orn-fill' : 'gaceta-orn-rule'"
      :d="stroke.d"
    />
  </svg>
</template>
