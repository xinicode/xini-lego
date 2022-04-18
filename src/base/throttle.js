export const throttle = (func, deley) => {
  let startTime = 0;
  return function () {
    let context = this;
    let args = arguments;
    let currentTime = +new Date();
    if (currentTime - startTime > deley) {
      func.apply(context, args);
      startTime = currentTime;
    }
  };
};
