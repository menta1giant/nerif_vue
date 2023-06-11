export const isElementInViewportVertically = function(element) {
  const coordinates = element.getBoundingClientRect();

  return (
    coordinates.top >= 0 &&
    coordinates.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}