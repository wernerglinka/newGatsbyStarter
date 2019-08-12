/* global document, window */

import { useState, useEffect } from "react";

const useInfiniteScroll = callback => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingDone, setFetchingDone] = useState(false);

  const debounce = (func, delay) => {
    let inDebounce;
    return function() {
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => {
        func.apply(this, arguments);
      }, delay);
    };
  };

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }

  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, 200));
    return () =>
      window.removeEventListener("scroll", debounce(handleScroll, 200));
  }, []);

  useEffect(() => {
    window.addEventListener("touchmove", handleScroll);
    return () => window.removeEventListener("touchmove", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching || fetchingDone) return;
    callback();
  }, [isFetching]);

  return [fetchingDone, setFetchingDone, isFetching, setIsFetching];
};

export default useInfiniteScroll;

// remove ASAP
