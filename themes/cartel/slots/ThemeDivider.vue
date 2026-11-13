<script setup lang="ts">
import { STRIP_PATCHES } from './press'

// The printer's control strip across the footer: a patch of each ink and three tints, between two registration marks. Decorative and static
defineProps<{
  placement?: 'footer'
}>()
</script>

<template>
  <div
    class="cartel-strip"
    aria-hidden="true"
  >
    <span class="cartel-strip-mark" />
    <span class="cartel-strip-patches">
      <span
        v-for="patch in STRIP_PATCHES"
        :key="patch"
        :class="['cartel-strip-patch', patch]"
      />
    </span>
    <span class="cartel-strip-rule" />
    <span class="cartel-strip-mark" />
  </div>
</template>
