/* eslint-disable no-param-reassign */

import { deepCopy } from './Helpers'

// Fast path to cloning, since this is monomorphic
export function cloneLayoutItem(layoutItem) {
  return {
    w: layoutItem.w,
    h: layoutItem.h,
    x: layoutItem.x,
    y: layoutItem.y,
    i: layoutItem.i,
    minW: layoutItem.minW,
    maxW: layoutItem.maxW,
    minH: layoutItem.minH,
    maxH: layoutItem.maxH,
    moved: Boolean(layoutItem.moved),
    static: Boolean(layoutItem.static),
    // These can be null/undefined
    isDraggable: layoutItem.isDraggable,
    isResizable: layoutItem.isResizable,
    resizeHandles: layoutItem.resizeHandles,
    isBounded: layoutItem.isBounded,
  }
}

/**
 * Returns the first item this layout collides with.
 * It doesn't appear to matter which order we approach this from, although
 * perhaps that is the wrong thing to do.
 *
 * @param  {Object} layoutItem Layout item.
 * @return {Object|undefined}  A colliding layout item, or undefined.
 */
export function getFirstCollision(
  layout,
  layoutItem,
) {
  for (let i = 0, len = layout.length; i < len; i += 1) {
    if (collides(layout[i], layoutItem)) return layout[i]
  }
}

export function getAllCollisions(layout, layoutItem) {
  return layout.filter(l => collides(l, layoutItem))
}

/**
 * Given two layoutitems, check if they collide.
 */
export function collides(l1, l2) {
  if (l1.i === l2.i) return false // same element
  if (l1.x + l1.w <= l2.x) return false // l1 is left of l2
  if (l1.x >= l2.x + l2.w) return false // l1 is right of l2
  if (l1.y + l1.h <= l2.y) return false // l1 is above l2
  if (l1.y >= l2.y + l2.h) return false // l1 is below l2
  return true // boxes overlap
}

/**
 * Return the bottom coordinate of the layout.
 *
 * @param  {Array} layout Layout array.
 * @return {Number}       Bottom coordinate.
 */
export function bottom(layout) {
  let max = 0
  let bottomY
  for (let i = 0, len = layout.length; i < len; i += 1) {
    bottomY = layout[i].y + layout[i].h
    if (bottomY > max) max = bottomY
  }
  return max
}

const heightWidth = { x: 'w', y: 'h' }
/**
 * Before moving item down, it will check if the movement will cause collisions and move those items down before.
 */
function resolveCompactionCollision(layout, item, moveToCoord, axis) {
  const sizeProp = heightWidth[axis]
  item[axis] += 1
  const itemIndex = layout
    .map(layoutItem => layoutItem.i)
    .indexOf(item.i)

  // Go through each item we collide with.
  for (let i = itemIndex + 1; i < layout.length; i += 1) {
    const otherItem = layout[i]
    // Ignore static items
    if (otherItem.static) continue

    // Optimization: we can break early if we know we're past this el
    // We can do this b/c it's a sorted layout
    if (otherItem.y > item.y + item.h) break

    if (collides(item, otherItem)) {
      resolveCompactionCollision(
        layout,
        otherItem,
        moveToCoord + item[sizeProp],
        axis,
      )
    }
  }

  item[axis] = moveToCoord
}

/**
 * Compact an item in the layout.
 *
 * Modifies item.
 *
 */
export function compactItem(
  compareWith,
  l,
  compactType,
  cols,
  fullLayout,
) {
  const compactV = compactType === 'vertical'
  const compactH = compactType === 'horizontal'
  if (compactV) {
    // Bottom 'y' possible is the bottom of the layout.
    // This allows you to do nice stuff like specify {y: Infinity}
    // This is here because the layout must be sorted in order to get the correct bottom `y`.
    l.y = Math.min(bottom(compareWith), l.y)
    // Move the element up as far as it can go without colliding.
    while (l.y > 0 && !getFirstCollision(compareWith, l)) {
      l.y -= 1
    }
  } else if (compactH) {
    // Move the element left as far as it can go without colliding.
    while (l.x > 0 && !getFirstCollision(compareWith, l)) {
      l.x -= 1
    }
  }

  // Move it down, and keep moving it down if it's colliding.
  let allCollide
  // eslint-disable-next-line no-cond-assign
  while ((allCollide = getFirstCollision(compareWith, l))) {
    if (compactH) {
      resolveCompactionCollision(fullLayout, l, allCollide.x + allCollide.w, 'x')
    } else {
      resolveCompactionCollision(fullLayout, l, allCollide.y + allCollide.h, 'y')
    }
    // Since we can't grow without bounds horizontally, if we've overflown, let's move it down and try again.
    if (compactH && l.x + l.w > cols) {
      l.x = cols - l.w
      l.y += 1
    }
  }

  // Ensure that there are no negative positions
  l.y = Math.max(l.y, 0)
  l.x = Math.max(l.x, 0)

  return l
}

/**
 * Sort layout items by column ascending then row ascending.
 *
 * Does not modify Layout
 */
export function sortLayoutItemsByColRow(layout) {
  return layout.slice(0).sort((a, b) => {
    if (a.x > b.x || (a.x === b.x && a.y > b.y)) {
      return 1
    }
    return -1
  })
}

/**
 * Sort layout items by row ascending and column ascending.
 *
 * Does not modify Layout.
 */
export function sortLayoutItemsByRowCol(layout) {
  // Slice to clone array as sort modifies
  return layout.slice(0).sort((a, b) => {
    if (a.y > b.y || (a.y === b.y && a.x > b.x)) {
      return 1
    } if (a.y === b.y && a.x === b.x) {
      // Without this, we can get different sort results in IE vs. Chrome/FF
      return 0
    }
    return -1
  })
}

/**
 * Get layout items sorted from top left to right and down.
 *
 * @return {Array} Array of layout objects.
 * @return {Array}        Layout, sorted static items first.
 */
export function sortLayoutItems(
  layout,
  compactType,
) {
  if (compactType === 'horizontal') return sortLayoutItemsByColRow(layout)
  if (compactType === 'vertical') return sortLayoutItemsByRowCol(layout)
  return layout
}

/**
 * Get all static elements.
 * @param  {Array} layout Array of layout objects.
 * @return {Array}        Array of static layout items..
 */
export function getStatics(layout) {
  return layout.filter(l => l.static)
}

/**
 * Given a layout, compact it. This involves going down each y coordinate and removing gaps
 * between items.
 *
 * Does not modify layout items (clones). Creates a new layout array.
 *
 * @param  {Array} layout Layout.
 * @param  {Boolean} verticalCompact Whether or not to compact the layout
 *   vertically.
 * @return {Array}       Compacted Layout.
 */

export function compactRGL(layout, cols, compactType = 'vertical') {
  // Statics go in the compareWith array right away so items flow around them.
  const compareWith = getStatics(layout)
  // We go through the items by row and column.
  const sorted = sortLayoutItems(layout, compactType)
  // Holding for new items.
  const out = Array(layout.length)

  for (let i = 0, len = sorted.length; i < len; i += 1) {
    let l = cloneLayoutItem(sorted[i])

    // Don't move static elements
    if (!l.static) {
      l = compactItem(compareWith, l, compactType, cols, sorted)

      // Add to comparison array. We only collide with items before this one.
      // Statics are already in this array.
      compareWith.push(l)
    }

    // Add to output array to make sure they still come out in the right order.
    out[layout.indexOf(sorted[i])] = l

    // Clear moved flag, if it exists.
    l.moved = false
  }

  return out
}

/**
 * compact multiple layout as their breakpoints
 * @param  {Object} layouts layout array
 * @param  {Object} breakpoints breakpoints object
 * @return {Object}           compacted layout
 * */
export function compactResponsiveLayouts(layouts, cols) {
  const lay = deepCopy(layouts)
  lay.lg = compactRGL(lay.lg, cols.lg)
  lay.md = compactRGL(lay.md, cols.md)
  lay.sm = compactRGL(lay.sm, cols.sm)
  return lay
}
