<script setup lang="ts">
import { COMPACT, FULL } from './hero'

// A front page set without words: frames, columns of type and a rosette. Decorative and static (ADR 0005, section 12)
const props = defineProps<{
  compact?: boolean
}>()

const plate = computed(() => (props.compact ? COMPACT : FULL))
</script>

<template>
  <div aria-hidden="true">
    <svg
      class="gaceta-hero"
      :viewBox="`0 0 ${plate.width} ${plate.height}`"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <path
        class="gaceta-hero-rules"
        :d="plate.rules"
      />
      <path
        class="gaceta-hero-type"
        :d="plate.type"
      />
      <g
        class="gaceta-hero-orn"
        :transform="plate.rosette"
      >
        <path
          v-for="(stroke, index) in plate.ornaments"
          :key="index"
          :class="stroke.kind === 'fill' ? 'gaceta-orn-fill' : 'gaceta-orn-rule'"
          :d="stroke.d"
        />
      </g>
    </svg>
  </div>
</template>
