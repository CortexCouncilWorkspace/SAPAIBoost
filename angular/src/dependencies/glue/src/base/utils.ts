/**
 * @fileoverview Shared utility functions for Glue components.
 */

/**
 * Available placement options.
 */
export type Placement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Extract numbers from CSS properties, like 20px -> 20.
 * @param val CSS property value.
 */
function toNum(val: string) {
  return Number(val.slice(0, -2));
}

/**
 * Calculates left/top coordinates for an Overlay element based on the
 * position of the Trigger element and the placement option (default: bottom).
 *
 * By default is uses auto placement which will try to position the Overlay
 * relative to the middle of the trigger element.
 * If there is not enough space it will try to position the Overlay on the
 * opposite side of the trigger element.
 * If there is not enough space on the opposite side it will try to position
 * the Overlay on the edge of the window.
 *
 * If placement is set to left/right/top/bottom it will try to position the
 * Overlay on the specified side of the trigger element. If there is not enough
 * space it will use the auto positioning logic.
 *
 *
 * @param root Root element that contains the Content and Trigger elements.
 * @param overlay Element that contains Overlay content.
 * @param trigger Element that triggers the Overlay.
 * @param placement? Placement of the Overlay, default is bottom. Possible
 *     values are: left, right, top, bottom.
 * @return Array containing overlay absolute positions [left, top].
 */
export function getOverlayAutoPosition(
  root: HTMLElement,
  overlay: HTMLElement,
  trigger: HTMLElement,
  placement: Placement = 'bottom',
): number[] | null {
  const overlayStyle = getComputedStyle(overlay);
  // Ignore auto-positioning if overlay is fixed (such as in Social/mobile).
  if (overlayStyle.position === 'fixed') {
    return null;
  }

  const triggerStyle = getComputedStyle(trigger);
  const triggerCoords = trigger.getBoundingClientRect();
  const overlayCoords = overlay.getBoundingClientRect();

  const firstSrollableParent = getScrollableParent(root);
  const scrollbarParentCoords = firstSrollableParent.getBoundingClientRect();
  const isBody = firstSrollableParent === document.body;
  const scrollableParentHeight = isBody
    ? window.innerHeight
    : scrollbarParentCoords.bottom;

  let noSpaceAtRight = false;
  let noSpaceAtLeft = false;
  let noSpaceAtTop = false;
  let noSpaceAtBottom = false;

  const horizOffset =
    placement === 'top' || placement === 'bottom'
      ? Math.abs(triggerCoords.width - overlayCoords.width) / 2
      : overlayCoords.width;

  // Check left edge of the container.
  noSpaceAtLeft = triggerCoords.left - horizOffset < scrollbarParentCoords.left;

  // Check right edge of the container.
  noSpaceAtRight =
    triggerCoords.right + horizOffset > scrollbarParentCoords.right;

  // Check bottom edge of the container.
  noSpaceAtBottom =
    triggerCoords.top + triggerCoords.height + overlayCoords.height >=
    scrollableParentHeight;

  // Check top edge of the container.
  noSpaceAtTop =
    triggerCoords.top - overlayCoords.height < scrollbarParentCoords.top;

  // If there is not enough space on both left and right side of the trigger,
  // align the center of the overlay with the center of the trigger.
  if (noSpaceAtLeft && noSpaceAtRight) {
    const left = (triggerCoords.width - overlayCoords.width) / 2;
    return noSpaceAtTop
      ? [left, triggerCoords.height + toNum(overlayStyle.marginTop)]
      : [left, -overlayCoords.height - toNum(overlayStyle.marginTop)];
  }

  if (placement === 'left' || placement === 'right') {
    return getOverlayAutoPositionHorizontal(
      placement,
      triggerCoords,
      overlayCoords,
      triggerStyle,
      overlayStyle,
      noSpaceAtTop,
      noSpaceAtBottom,
      noSpaceAtLeft,
      noSpaceAtRight,
    );
  } else {
    return getOverlayAutoPositionVertical(
      placement,
      triggerCoords,
      overlayCoords,
      triggerStyle,
      overlayStyle,
      noSpaceAtTop,
      noSpaceAtBottom,
      noSpaceAtLeft,
      noSpaceAtRight,
    );
  }
}

/**
 * Calculates overlay position for horizontal placements.
 */
function getOverlayAutoPositionHorizontal(
  placement: 'left' | 'right',
  triggerCoords: DOMRect,
  overlayCoords: DOMRect,
  triggerStyle: CSSStyleDeclaration,
  overlayStyle: CSSStyleDeclaration,
  noSpaceAtTop: boolean,
  noSpaceAtBottom: boolean,
  noSpaceAtLeft: boolean,
  noSpaceAtRight: boolean,
): number[] | null {
  let left = 0;
  let top = 0;

  if (!noSpaceAtTop && !noSpaceAtBottom) {
    // If there is enough space, aligns the center of the overlay with the
    // center of the trigger, including margins.

    const triggerVerticalSpace =
      triggerCoords.height +
      toNum(triggerStyle.marginTop) +
      toNum(triggerStyle.marginBottom);
    const overlayVerticalSpace =
      overlayCoords.height +
      toNum(overlayStyle.marginTop) +
      toNum(overlayStyle.marginBottom);
    top = (triggerVerticalSpace - overlayVerticalSpace) / 2;
  } else {
    // Align the top of the overlay with the top of the trigger.
    // If there is not enough space, align the bottom of the overlay with the
    // bottom of the trigger.
    top = noSpaceAtTop ? 0 : triggerCoords.height - overlayCoords.height;
    top += toNum(triggerStyle.marginTop) - toNum(overlayStyle.marginTop);
  }

  // Horizontal position after the trigger, including trigger content.
  const rightDistanceFromTrigger =
    triggerCoords.width + toNum(triggerStyle.marginRight);
  // Horizontal position before the trigger, including overlay content.
  const leftDistanceFromTrigger =
    overlayCoords.width + toNum(overlayStyle.marginRight);

  // LEFT: before the trigger.
  // RIGHT: after the trigger.
  // Switch to the opposite side if there is not enough space.
  if (placement === 'left') {
    left = noSpaceAtLeft ? rightDistanceFromTrigger : -leftDistanceFromTrigger;
  } else {
    left = noSpaceAtRight ? -leftDistanceFromTrigger : rightDistanceFromTrigger;
  }

  return [left, top];
}

/**
 * Calculates overlay position for vertical placements.
 */
function getOverlayAutoPositionVertical(
  placement: 'top' | 'bottom',
  triggerCoords: DOMRect,
  overlayCoords: DOMRect,
  triggerStyle: CSSStyleDeclaration,
  overlayStyle: CSSStyleDeclaration,
  noSpaceAtTop: boolean,
  noSpaceAtBottom: boolean,
  noSpaceAtLeft: boolean,
  noSpaceAtRight: boolean,
): number[] | null {
  let left = 0;
  let top = 0;

  if (!noSpaceAtLeft && !noSpaceAtRight) {
    // If there is enough space, aligns the center of the overlay with the
    // center of the trigger.
    left = (triggerCoords.width - overlayCoords.width) / 2;
  } else {
    // Align the left of the overlay with the right of the trigger.
    // If there is not enough space, align the right of the overlay with the
    // left of the trigger.
    let triggerHorizSpace = toNum(triggerStyle.marginLeft);
    let overlayHorizSpace = toNum(overlayStyle.marginLeft);
    if (noSpaceAtRight) {
      triggerHorizSpace += triggerCoords.width;
      overlayHorizSpace += overlayCoords.width;
    }
    left = triggerHorizSpace - overlayHorizSpace;
  }

  // Vertical position above the trigger, including trigger content.
  const downDistanceFromTrigger =
    triggerCoords.height + toNum(overlayStyle.marginTop);
  // Vertical position below the trigger, including overlay content.
  const upDistanceFromTrigger =
    overlayCoords.height + toNum(overlayStyle.marginTop);

  // TOP: above the trigger.
  // BOTTOM: below the trigger.
  // Switch to the opposite side if there is not enough space.
  if (placement === 'top') {
    top = noSpaceAtTop ? downDistanceFromTrigger : -upDistanceFromTrigger;
  } else {
    top = noSpaceAtBottom ? -upDistanceFromTrigger : downDistanceFromTrigger;
  }

  return [left, top];
}

/**
 * Determines scrollable parent element for calculating overlay position.
 * @param elem DOM node for which to find the scrollable parent
 * @return elem DOM node which is the first scrollable parent
 */
function getScrollableParent(elem: HTMLElement): Element {
  // check if overflow property is set.
  const isOverflowSet = (overflowValue: string) =>
    /auto|hidden|scroll|overlay/.test(overflowValue);

  const computedStyle = getComputedStyle(elem);

  if (elem === document.documentElement) return document.body;

  if (
    isOverflowSet(computedStyle.overflow) ||
    isOverflowSet(computedStyle.overflowY) ||
    isOverflowSet(computedStyle.overflowX)
  ) {
    return elem;
  } else {
    return getScrollableParent(elem.parentElement!);
  }
}
