/* eslint-disable no-param-reassign */

import { cloneLayoutItem, collides, getAllCollisions, sortLayoutItems } from './gridLayoutHelper'

/**
 * Move an element. Responsible for doing cascading movements of other elements.
 *
 * Modifies layout items.
 *
 * @param  {Array}      layout            Full layout to modify.
 * @param  {LayoutItem} l                 element to move.
 * @param  {Number}     [x]               X position in grid units.
 * @param  {Number}     [y]               Y position in grid units.
 */
export default function moveElement(
  layout,
  l,
  x,
  y,
  isUserAction,
  preventCollision,
  compactType,
  cols,
  allowOverlap,
) {
  // If this is static and not explicitly enabled as draggable,
  // no move is possible, so we can short-circuit this immediately.
  if (l.static && l.isDraggable !== true) return layout

  // Short-circuit if nothing to do.
  if (l.y === y && l.x === x) return layout

  console.log(
    `Moving element ${l.i} to [${String(x)},${String(y)}] from [${l.x},${l.y}]`,
  )
  const oldX = l.x
  const oldY = l.y

  // This is quite a bit faster than extending the object
  if (typeof x === 'number') l.x = x
  if (typeof y === 'number') l.y = y
  l.moved = true

  // If this collides with anything, move it.
  // When doing this comparison, we have to sort the items we compare with
  // to ensure, in the case of multiple collisions, that we're getting the
  // nearest collision.
  let sorted = sortLayoutItems(layout, compactType)
  // eslint-disable-next-line no-nested-ternary
  const movingUp = compactType === 'vertical' && typeof y === 'number'
    ? oldY >= y
    : compactType === 'horizontal' && typeof x === 'number'
      ? oldX >= x
      : false
  // $FlowIgnore acceptable modification of read-only array as it was recently cloned
  if (movingUp) sorted = sorted.reverse()
  const collisions = getAllCollisions(sorted, l)
  const hasCollisions = collisions.length > 0

  // We may have collisions. We can short-circuit if we've turned off collisions or
  // allowed overlap.
  if (hasCollisions && allowOverlap) {
    // Easy, we don't need to resolve collisions. But we *did* change the layout,
    // so clone it on the way out.
    return cloneLayout(layout)
  } if (hasCollisions && preventCollision) {
    // If we are preventing collision but not allowing overlap, we need to
    // revert the position of this element so it goes to where it came from, rather
    // than the user's desired location.
    console.log(`Collision prevented on ${l.i}, reverting.`)
    l.x = oldX
    l.y = oldY
    l.moved = false
    return layout // did not change so don't clone
  }

  // Move each item that collides away from this element.
  for (let i = 0, len = collisions.length; i < len; i += 1) {
    const collision = collisions[i]
    console.log(
      `Resolving collision between ${l.i} at [${l.x},${l.y}] and ${collision.i} at [${collision.x},${collision.y}]`,
    )

    // Short circuit so we can't infinite loop
    if (collision.moved) continue

    // Don't move static items - we have to move *this* element away
    if (collision.static) {
      layout = moveElementAwayFromCollision(
        layout,
        collision,
        l,
        isUserAction,
        compactType,
        cols,
      )
    } else {
      layout = moveElementAwayFromCollision(
        layout,
        l,
        collision,
        isUserAction,
        compactType,
        cols,
      )
    }
  }

  return layout
}

export function cloneLayout(layout) {
  const newLayout = Array(layout.length)
  for (let i = 0, len = layout.length; i < len; i += 1) {
    newLayout[i] = cloneLayoutItem(layout[i])
  }
  return newLayout
}

/**
 * This is where the magic needs to happen - given a collision, move an element away from the collision.
 * We attempt to move it up if there's room, otherwise it goes below.
 *
 * @param  {Array} layout            Full layout to modify.
 * @param  {LayoutItem} collidesWith Layout item we're colliding with.
 * @param  {LayoutItem} itemToMove   Layout item we're moving.
 */
export function moveElementAwayFromCollision(
  layout,
  collidesWith,
  itemToMove,
  isUserAction,
  compactType,
  cols,
) {
  const compactH = compactType === 'horizontal'
  // Compact vertically if not set to horizontal
  const compactV = compactType !== 'horizontal'
  const preventCollision = collidesWith.static // we're already colliding (not for static items)

  // If there is enough space above the collision to put this element, move it there.
  // We only do this on the main collision as this can get funky in cascades and cause
  // unwanted swapping behavior.
  if (isUserAction) {
    // Reset isUserAction flag because we're not in the main collision anymore.
    isUserAction = false

    // Make a mock item so we don't modify the item here, only modify in moveElement.
    const fakeItem = {
      x: compactH ? Math.max(collidesWith.x - itemToMove.w, 0) : itemToMove.x,
      y: compactV ? Math.max(collidesWith.y - itemToMove.h, 0) : itemToMove.y,
      w: itemToMove.w,
      h: itemToMove.h,
      i: '-1',
    }

    // No collision? If so, we can go up there; otherwise, we'll end up moving down as normal
    if (!getFirstCollision(layout, fakeItem)) {
      console.log(
        `Doing reverse collision on ${itemToMove.i} up to [${fakeItem.x},${fakeItem.y}].`,
      )
      return moveElement(
        layout,
        itemToMove,
        compactH ? fakeItem.x : undefined,
        compactV ? fakeItem.y : undefined,
        isUserAction,
        preventCollision,
        compactType,
        cols,
      )
    }
  }

  return moveElement(
    layout,
    itemToMove,
    compactH ? itemToMove.x + 1 : undefined,
    compactV ? itemToMove.y + 1 : undefined,
    isUserAction,
    preventCollision,
    compactType,
    cols,
  )
}

/**
 * Returns the first item this layout collides with.
 * It doesn't appear to matter which order we approach this from, although
 * perhaps that is the wrong thing to do.
 *
 * @param  {Object} layoutItem Layout item.
 * @return {Object|undefined}  A colliding layout item, or undefined.
 */
export function getFirstCollision(layout, layoutItem) {
  for (let i = 0, len = layout.length; i < len; i += 1) {
    if (collides(layout[i], layoutItem)) return layout[i]
  }
}


// react event 
const handleLayoutMouseMove = (e) => {
  const blk = { i: 'temp', x: 0, y: 0, w: 20, h: 20 }
  const posititons = {
    droppingItem: blk,
    onDropDragOver: () => { },
    margin: [0, 0],
    cols: 60,
    rowHeight: 2,
    maxRows: 1000,
    width: gridWidth - (formGutter + BUILDER_PADDING.all + CUSTOM_SCROLLBAR_GUTTER),
    containerPadding: [0, 0],
    transformScale: 1,
  }

  // ========================
  const lglay = deepCopy(layouts.lg)
  if (!lglay.find(l => l.i === 'temp')) {
    lglay.push(blk)
  }
  const nl = moveElement(
    lglay,
    blk,
    e.clientX,
    e.clientY,
    true,
    true,
    'vertical',
    60,
    false,
  )
  console.log({ nl, e })
  setLayouts((prvLays) => {
    const newLays = deepCopy(prvLays)
    newLays.lg = nl
    newLays.lg = compactRGL(newLays.lg)
    return newLays
  })
}