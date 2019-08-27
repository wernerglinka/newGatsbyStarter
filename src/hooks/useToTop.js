/* global document, window */

import { useState, useEffect } from "react";

const useToTop = () => {
  const [showToTop, setToTop] = useState(false);

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
    // Safari reports 0 for document.documentElement.scrollTop. This fix
    // will use the right scrollTop for all browsers
    const scrollTop = Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );

    if (scrollTop > 150) {
      setToTop(true);
    } else {
      setToTop(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll, 100));
    return () =>
      window.removeEventListener("scroll", debounce(handleScroll, 100));
  }, []);

  useEffect(() => {
    window.addEventListener("touchmove", handleScroll);
    return () => window.removeEventListener("touchmove", handleScroll);
  }, []);

  return showToTop;
};

export default useToTop;
