const debounce = (func, waitTime) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, waitTime);
  };
};

export default debounce;
