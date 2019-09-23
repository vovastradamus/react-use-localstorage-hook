import { useState, useEffect } from "react";

let subs = {};
let initialValues = {};

function subToKey(key, handler, initialValue) {
  if (!Object.prototype.hasOwnProperty.call(subs, key)) {
    subs[key] = [];
  }
  if (
    initialValue !== undefined &&
    !Object.prototype.hasOwnProperty.call(initialValues, key)
  ) {
    initialValues[key] = initialValue;
  }
  subs[key].push(handler);
}

function unsubToKey(key, handler, initialValue) {
  if (!Object.prototype.hasOwnProperty.call(subs, key)) {
    subs[key] = [];
  }

  subs[key] = subs[key].filter(h => handler !== h);

  if (initialValue !== undefined && !subs[key].length) {
    Reflect.deleteProperty(initialValues, key);
  }
}

function setKeyValue(key, value) {
  if (!Object.prototype.hasOwnProperty.call(subs, key)) {
    return;
  }

  subs[key].forEach(f => f(value));
}

function prepareReadValue(value, key) {
  try {
    if (
      key !== undefined &&
      Object.prototype.hasOwnProperty.call(initialValues, key)
    ) {
      const initialValue = initialValues[key];
      if (!(initialValue instanceof Object)) {
        return value;
      }
    }
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
}

const useLocalStorage = (key, initialState) => {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? prepareReadValue(item, key) : initialState;
    } catch (error) {
      return initialState;
    }
  });

  const wathcer = value => {
    setState(value);
  };

  useEffect(() => {
    subToKey(key, wathcer, initialState);
    return () => {
      unsubToKey(key, wathcer, initialState);
    };
  }, []);

  const updateStorage = value => {
    setKeyValue(key, value);
    localStorage.setItem(
      key,
      value instanceof Object ? JSON.stringify(value) : value
    );
  };

  return [state, updateStorage];
};

window.addEventListener("storage", event => {
  const { key, newValue } = event;
  if (!Object.prototype.hasOwnProperty.call(subs, key)) {
    return;
  }
  setKeyValue(key, prepareReadValue(newValue, key));
});

export default useLocalStorage;
