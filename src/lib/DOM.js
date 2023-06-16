export function isElementInViewport(el) {
  console.dir(el);
  const rect = el.getBoundingClientRect();

  return (
    el.clientWidth && 
    el.clientHeight &&
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}