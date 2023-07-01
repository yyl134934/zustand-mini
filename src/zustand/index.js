import { useEffect, useReducer, useRef, useMemo } from "react";

let observe = new Set();
const unsubscribe = (item) => {
  observe.delete(item);
};
const subscribe = (item) => {
  observe.add(item);
  return unsubscribe;
};
const notify = () => {
  observe.forEach((item) => {
    item();
  });
};

const create = (setup) => {
  let context = null;

  if (!context || !context.state) {
    context = { state: {} };
  }
  const set = (setFn) => {
    const newState = setFn(context.state);
    context.state = { ...context.state, ...newState };
    console.info("set:", context.state);
    notify();
  };

  const get = (getFn) => {
    console.info("get:", getFn(context.state));
    return getFn(context.state);
  };

  context.state = setup(set, get);

  const useStore = (selectorFn) => {
    const value = useRef(useMemo(() => selectorFn(context.state), []));
    const [, forceUpdate] = useReducer((c) => c + 1, 0);

    useEffect(() => {
      return subscribe(() => {
        const newState = selectorFn(context.state);
        if (value !== newState) {
          value.current = newState;
          forceUpdate();
        }
      });
    }, []);

    return value.current;
  };

  console.info(context);

  return useStore;
};

export { create };
