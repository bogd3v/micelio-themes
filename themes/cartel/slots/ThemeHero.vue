<script setup lang="ts">
import { GROUND, HALFTONE_CELL, REGISTRATION, SUN, SUN_BANDS } from './press'

// A two-ink poster: a halftone sun in the first ink, a disc of the second ink printed over it, the ground in the key plate, and the printer's marks. Decorative and static; the caller's class gives the box
const props = withDefaults(defineProps<{
  compact?: boolean
}>(), {
  compact: false,
})

// The core renders the art twice (full and compact), so the ids of the patterns are unique per instance
const uid = useId()
</script>

<template>
  <div
    :class="['cartel-hero', { 'cartel-hero-compact': props.compact }]"
    aria-hidden="true"
  >
    <svg
      class="cartel-hero-art"
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
    >
      <defs>
        <pattern
          v-for="(band, index) in SUN_BANDS"
          :id="`${uid}-tone-${index}`"
          :key="band.y"
          class="cartel-hero-tone"
          :width="HALFTONE_CELL"
          :height="HALFTONE_CELL"
          patternUnits="userSpaceOnUse"
        >
          <circle
            :cx="HALFTONE_CELL / 2"
            :cy="HALFTONE_CELL / 2"
            :r="band.dot"
          />
        </pattern>
        <clipPath :id="`${uid}-sun`">
          <circle
            :cx="SUN.cx"
            :cy="SUN.cy"
            :r="SUN.r"
          />
        </clipPath>
      </defs>
      <g :clip-path="`url(#${uid}-sun)`">
        <rect
          v-for="(band, index) in SUN_BANDS"
          :key="band.y"
          :x="SUN.cx - SUN.r"
          :y="band.y"
          :width="SUN.r * 2"
          :height="band.height"
          :fill="`url(#${uid}-tone-${index})`"
        />
      </g>
      <circle
        class="cartel-hero-disc"
        cx="196"
        cy="372"
        r="118"
      />
      <g class="cartel-hero-ground">
        <rect
          v-for="bar in GROUND"
          :key="bar.y"
          x="40"
          :y="bar.y"
          width="520"
          :height="bar.height"
        />
      </g>
      <g class="cartel-hero-marks">
        <g
          v-for="mark in REGISTRATION"
          :key="`${mark.cx}-${mark.cy}`"
        >
          <circle
            :cx="mark.cx"
            :cy="mark.cy"
            r="11"
          />
          <path :d="`M${mark.cx - 20} ${mark.cy}h40M${mark.cx} ${mark.cy - 20}v40`" />
        </g>
        <path d="M14 40V14H40M560 586H586V560" />
      </g>
    </svg>
  </div>
</template>
