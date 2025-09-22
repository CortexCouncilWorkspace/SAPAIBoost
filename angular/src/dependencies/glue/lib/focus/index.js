/**
 * @fileoverview Utilities relating to keyboard focus.
 */
/**
 * Query selectors for elements that can receive focus.
 * Include Material 3 custom elements that Glue uses.
 */
const FOCUSABLE_ELEMENT_SELECTORS = [
  'input',
  'textarea',
  'select',
  'button',
  'iframe',
  '[role="button"]',
  'a',
  '[tabindex]',
  'md-checkbox',
  'md-radio',
  'md-switch',
  'md-outlined-select',
  'md-filled-select',
  'md-outlined-text-field',
  'md-filled-text-field',
];
/**
 * Returns true if the element is able to receive focus. Note that this will
 * return true even for elements where the user isn't able to move focus
 * to the element but javascript is able to move focus.
 * @param el The Element to check for focusability.
 * @return Returns true if the element is focusable
 */
function isElementFocusable(el) {
  return (
      FOCUSABLE_ELEMENT_SELECTORS
          .filter((selector) => {
            return el.matches(selector);
          })
          .length > 0);
}
/**
 * Get all child focusable elements.
 * @param el The parent element.
 * @return Array containing all child focusable elements.
 */
function getFocusableElements(el) {
  const inputs = el.querySelectorAll('input');
  const anchors = el.querySelectorAll('a');
  const textareas = el.querySelectorAll('textarea');
  const selects = el.querySelectorAll('select');
  const buttons = el.querySelectorAll('button');
  const iframes = el.querySelectorAll('iframe');
  const roleBtnElements = el.querySelectorAll(
      '[role="button"]' +
      ':not(input)' +
      ':not(a)' +
      ':not(textarea)' +
      ':not(select)' +
      ':not(button)' +
      ':not(iframe)');
  const tabindexElements = el.querySelectorAll(
      '[tabindex="0"]' +
      ':not([role="button"])' +
      ':not(input)' +
      ':not(a)' +
      ':not(textarea)' +
      ':not(select)' +
      ':not(button)' +
      ':not(iframe)' +
      ':not(md-checkbox)' +
      ':not(md-radio)' +
      ':not(md-switch)' +
      ':not(md-outlined-select)' +
      ':not(md-filled-select)' +
      ':not(md-outlined-text-field)' +
      ':not(md-filled-text-field)');
  const mdCheckboxes = el.querySelectorAll('md-checkbox');
  const mdRadios = el.querySelectorAll('md-radio');
  const mdSwitches = el.querySelectorAll('md-switch');
  const mdOutlinedSelects = el.querySelectorAll('md-outlined-select');
  const mdFilledSelects = el.querySelectorAll('md-filled-select');
  const mdOutlinedTextFields = el.querySelectorAll('md-outlined-text-field');
  const mdFilledTextFields = el.querySelectorAll('md-filled-text-field');
  return [
    ...inputs,
    ...anchors,
    ...textareas,
    ...selects,
    ...buttons,
    ...iframes,
    ...roleBtnElements,
    ...tabindexElements,
    ...mdCheckboxes,
    ...mdRadios,
    ...mdSwitches,
    ...mdOutlinedSelects,
    ...mdFilledSelects,
    ...mdOutlinedTextFields,
    ...mdFilledTextFields,
  ];
}
export {FOCUSABLE_ELEMENT_SELECTORS, getFocusableElements, isElementFocusable};
