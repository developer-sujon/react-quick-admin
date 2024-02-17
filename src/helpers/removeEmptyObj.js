const removeEmptyObj = (fullObj) =>
  Object.keys(fullObj).reduce((obj, key) => {
    if (fullObj[key] !== '') {
      obj[key] = fullObj[key];
    }
    return obj;
  }, {});

export default removeEmptyObj;
