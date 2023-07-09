export default function debounce(callback, ms) {
  let timer;

  return function(...args){
    if (timer) {
      clearTimeout(timer);
    }
    const context = this;
    timer = setTimeout(()=>{
      callback.apply(context, args);
    }, ms);
  }
}
