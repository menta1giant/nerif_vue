export function showPageLoader() {
  const loadingEvent = new CustomEvent('pageLoading');
  document.dispatchEvent(loadingEvent);
}

export function finishPageLoading() {
  const loadingEvent = new CustomEvent('pageFinishedLoading');
  document.dispatchEvent(loadingEvent);
}