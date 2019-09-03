/* global document, window, IntersectionObserver */

import { useState, useEffect } from "react";

const useIScroll = callback => {
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

  /*
  function handleScroll() {
    // Safari report 0 for document.documentElement.scrollTop. This fix
    // will use the right scrollTop for all browsers
    const scrollTop = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );

    if (
      window.innerHeight + scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    setIsFetching(true);
  }
  */

  function handleScroll() {
    const observer = new IntersectionObserver(updateList, {
      root: document.body,
      rootMargin: "150px",
      threshold: 1,
    });

    const target = document.querySelector("#newsList");
    observer.observe(target);

    function updateList(entries, observer) {
      setIsFetching(true);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, 300));
    return () =>
      window.removeEventListener("scroll", debounce(handleScroll, 300));
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

export default useIScroll;
