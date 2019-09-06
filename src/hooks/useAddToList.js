/* global IntersectionObserver, window */
import { useEffect, useRef, useState } from "react";

/**
 * useAddToList
 * Don't use scrolling to determine when to load more items in a list.
 * Use intersetion Observer instead
 * Inspired by: https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
 * and: https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks
 *
 * @param {function} callback  function to load more items
 */
const useAddToList = (allNewsList, chunk, { root, rootMargin, threshold }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [fetchingDone, setFetchingDone] = useState(false);
  const [node, setNode] = useState(null);
  const displayLengthRef = useRef(chunk);
  // use state to hold the list of items to be displayed, this
  // so every time we update the list we cause a new render
  let listItemsToDisplay = allNewsList.slice(0, chunk);
  const [listItems, setListItems] = useState(listItemsToDisplay);
  let addItems;

  /**
   * fetchMoreListItems()
   * Add a new chunk or whatever remains to the display list
   */
  function fetchMoreListItems() {
    const displayLength = displayLengthRef.current;
    const remainingItems = allNewsList.length - displayLength;

    if (remainingItems > 0) {
      if (remainingItems > chunk) {
        addItems = chunk;
      } else {
        addItems = remainingItems;
        setFetchingDone(true);
      }
    }

    listItemsToDisplay = allNewsList.slice(
      displayLength,
      displayLength + addItems
    );
    displayLengthRef.current += addItems;

    setListItems(prevState => [...prevState, ...listItemsToDisplay]);
    setIsFetching(false);
  }

  /**
   * updateList()
   * Called from the intersection observer when list end approached viewport bottom
   */
  function updateList() {
    setIsFetching(true);
  }

  const temp =
    typeof window !== "undefined" ? new IntersectionObserver(updateList) : null;

  const observer = useRef(temp, {
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
    fetchMoreListItems();
  }, [isFetching]);

  return [setNode, listItems];
};
export default useAddToList;
