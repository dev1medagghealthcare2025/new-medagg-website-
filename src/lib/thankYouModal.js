export function openThankYouModal() {
  window.dispatchEvent(new CustomEvent('thankyou:open'));
}
