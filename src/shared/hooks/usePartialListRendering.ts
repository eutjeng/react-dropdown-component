import { useCallback, useEffect, useState } from 'react';

const remToPixels = (rem: number) =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

export const usePartialListRendering = (
  listRef: React.RefObject<HTMLDivElement>,
  totalItems: number,
  itemHeightInRem: number,
  bufferItems: number = 5,
) => {
  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 0]);

  const calculateVisibleItems = useCallback(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    const scrollTop = listElement.scrollTop;
    const listHeight = listElement.clientHeight;
    const itemHeightInPixels = remToPixels(itemHeightInRem);

    // Calculate start and end index, incorporating the buffer
    const startIdx = Math.max(
      0,
      Math.floor(scrollTop / itemHeightInPixels) - bufferItems,
    );
    const endIdx = Math.min(
      totalItems,
      Math.ceil((scrollTop + listHeight) / itemHeightInPixels) + bufferItems,
    );

    // Adjust the startIdx and endIdx to ensure they are within the bounds of the list
    const adjustedStartIdx = Math.max(0, startIdx);
    const adjustedEndIdx = Math.min(totalItems, endIdx);

    setVisibleRange([adjustedStartIdx, adjustedEndIdx]);
  }, [listRef, totalItems, itemHeightInRem, bufferItems]);

  useEffect(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    // Trigger the calculation on resize as well
    const resizeObserver = new ResizeObserver(calculateVisibleItems);
    resizeObserver.observe(listElement);

    // Calculate items once initially in case the list is already visible
    calculateVisibleItems();

    return () => resizeObserver.disconnect();
  }, [calculateVisibleItems, listRef]);

  // Render only visible items, no need to handle the buffer here since it's included in the range
  const itemsToRender = useCallback(() => {
    return Array.from(
      { length: visibleRange[1] - visibleRange[0] + 1 },
      (_, i) => i + visibleRange[0],
    );
  }, [visibleRange]);

  return { itemsToRender, calculateVisibleItems };
};
