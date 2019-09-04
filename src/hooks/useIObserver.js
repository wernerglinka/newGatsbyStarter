/* global IntersectionObserver */
import { useEffect, useRef, useState } from "react";

/**
 * useIObserver
 * Don't use scrolling to determine when to load more items in a list.
 * Use intersetion Observer instead
 * Inspired by: https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
 * and: https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks
 *
 * @param {function} callback  function to load more items
 */
const useIObserver = (callback, { root = null, rootMargin, threshold = 0 }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingDone, setFetchingDone] = useState(false);
  const [node, setNode] = useState(null);

  function updateList() {
    setIsFetching(true);
  }

  const observer = useRef(new IntersectionObserver(updateList), {
    root,
    rootMargin,
    threshold,
  });

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node]);

  useEffect(() => {
    if (!isFetching || fetchingDone) return;
    callback();
  }, [isFetching]);

  return [setNode, fetchingDone, setFetchingDone, isFetching, setIsFetching];
};
export default useIObserver;
