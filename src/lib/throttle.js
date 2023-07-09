export default function throttle(callback, ms) {
  let timer = null;

  return function(...args) {
    const onComplete = () => {
      callback.apply(this, args);
      timer = null;
    };

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(onComplete, ms);
  };
}
