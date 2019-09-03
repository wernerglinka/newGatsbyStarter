/* global document, window, IntersectionObserver */

import { useState, useEffect } from "react";

const useIScroll = callback => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingDone, setFetchingDone] = useState(false);

  useEffect(() => {
    function updateList() {
      setIsFetching(true);
    }

    const observer = new IntersectionObserver(updateList, {
      root: document.body,
      rootMargin: "150px",
      threshold: 1,
    });

    const target = document.querySelector("#newsList");
    observer.observe(target);
  }, []);

  useEffect(() => {
    if (!isFetching || fetchingDone) return;
    callback();
  }, [isFetching]);

  return [fetchingDone, setFetchingDone, isFetching, setIsFetching];
};

export default useIScroll;
