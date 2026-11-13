// ThemeHero: a front page set without words. A double frame, a compound rule, the rosette in the middle and columns of hairlines
// for the type, all in the key plate, with the ornaments in the stamp ink. Computed once, at module load

import { ROSETTE } from './ornaments'
import type { Stroke } from './ornaments'

/** One composition of the hero art, in the units of its viewBox. */
export interface Plate {
  width: number
  height: number
  /** Hairlines and frames in the key plate. */
  rules: string
  /** Lines of type, lighter than the rules. */
  type: string
  /** Ornaments in the stamp ink. */
  ornaments: readonly Stroke[]
  /** Where the rosette sits and how large: a transform of the 100 x 100 ornament box. */
  rosette: string
}

/** Lines of greeked type down a column: widths vary as a ragged paragraph would, with a short last line every few. */
function column(x: number, y: number, width: number, lines: number, leading: number, seed: number): string {
  let d = ''
  for (let i = 0; i < lines; i++) {
    const last = (i + seed) % 7 === 6
    const w = last ? width * (0.35 + ((i * 13 + seed) % 5) / 20) : width * (0.9 + ((i * 7 + seed) % 3) / 30)
    d += `M${x} ${y + i * leading}h${Math.min(width, w).toFixed(1)}`
    if (last) i++
  }
  return d
}

function plate(width: number, height: number, compact: boolean): Plate {
  // The full art sits beside the copy of the hero, which runs over its first third: the page starts after it
  const x0 = compact ? 0 : Math.round(width * 0.36)
  const m = compact ? 10 : 24
  const inner = m + (compact ? 6 : 10)
  const frame = `M${x0 + m} ${m}H${width - m}V${height - m}H${x0 + m}Z`
    + `M${x0 + inner} ${inner}H${width - inner}V${height - inner}H${x0 + inner}Z`
  const top = inner + (compact ? 34 : 72)
  const gutter = compact ? 14 : 28
  const cols = compact ? 3 : 2
  const colWidth = (width - x0 - 2 * inner - 2 * gutter - (cols - 1) * gutter) / cols
  let rules = frame
    + `M${x0 + inner + gutter} ${top}H${width - inner - gutter}`
    + `M${x0 + inner + gutter} ${top + 4}H${width - inner - gutter}`
  let type = ''
  const leading = compact ? 7 : 12
  const bodyTop = top + (compact ? 14 : 28)
  const rows = Math.floor((height - inner - gutter / 2 - bodyTop) / leading)
  for (let c = 0; c < cols; c++) {
    const x = x0 + inner + gutter + c * (colWidth + gutter)
    if (c > 0) rules += `M${(x - gutter / 2).toFixed(1)} ${bodyTop}V${height - inner - gutter / 2}`
    if (c === (compact ? 1 : 0)) {
      // The middle column holds the rosette over a short block of type
      const box = colWidth * 0.9
      type += column(x, bodyTop + box + leading * 2, colWidth, Math.max(0, rows - Math.ceil(box / leading) - 2), leading, c)
    } else {
      type += column(x, bodyTop, colWidth, rows, leading, c * 3)
    }
  }
  // The masthead: a heavier line of type set in the middle of the top band
  const headWidth = (width - x0 - 2 * inner) * 0.46
  type += `M${(x0 + (width - x0 - headWidth) / 2).toFixed(1)} ${inner + (top - inner) / 2}h${headWidth.toFixed(1)}`
  const box = colWidth * 0.9
  const rx = x0 + inner + gutter + (compact ? colWidth + gutter : 0) + (colWidth - box) / 2
  const ry = bodyTop + leading
  return {
    width,
    height,
    rules,
    type,
    ornaments: ROSETTE,
    rosette: `translate(${rx.toFixed(1)} ${ry.toFixed(1)}) scale(${(box / 100).toFixed(3)})`,
  }
}

/** The full art, 760 x 720 px from 1024px up. */
export const FULL: Plate = plate(760, 720, false)
/** The compact art, 390 x 300 px below the copy on smaller screens. */
export const COMPACT: Plate = plate(390, 300, true)
