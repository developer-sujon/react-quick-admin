const removeEmptyObjects = (obj) => {
  const propNames = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      (typeof obj[propName] === "object" &&
        Object.keys(obj[propName]).length === 0) ||
      (Array.isArray(obj[propName]) && obj[propName].length === 0) ||
      obj[propName] === ""
    ) {
      delete obj[propName];
    }
  }
  return obj;
};

const removeEmptyElements = (obj) => {
  if (Array.isArray(obj)) {
    obj.forEach((element, index) =>
      obj.splice(index, 1, removeEmptyElements(element))
    );
    return obj;
  }
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([, v]) =>
        Array.isArray(v)
          ? v.length !== 0
          : v !== null && v !== "" && v !== undefined
      )
      .map(([k, v]) => [k, v === Object(v) ? removeEmptyElements(v) : v])
  );
};
export { removeEmptyObjects };
export default removeEmptyElements;
