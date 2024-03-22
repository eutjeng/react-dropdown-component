import {
  BUFFER_ITEMS,
  ITEM_HEIGHT_IN_REM,
} from '@/features/userSelect/lib/utils/constants';
import { useCallback, useEffect, useState } from 'react';

// Assuming 1rem = 16px, but this will dynamically adjust to actual root font-size.
const remToPixels = (rem: number) =>
  rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

export const usePartialListRendering = (
  listRef: React.RefObject<HTMLDivElement>,
  totalItems: number,
) => {
  const [visibleRange, setVisibleRange] = useState<[number, number]>([0, 0]);

  const calculateVisibleItems = useCallback(() => {
    const listElement = listRef.current;
    if (!listElement) return;

    const scrollTop = listElement.scrollTop;
    const listHeight = listElement.clientHeight;
    const itemHeightInPixels = remToPixels(ITEM_HEIGHT_IN_REM);

    // Calculate start and end index without buffer since we'll handle it in rendering
    const startIdx = Math.max(0, Math.floor(scrollTop / itemHeightInPixels));
    const endIdx = Math.min(
      totalItems,
      Math.ceil((scrollTop + listHeight) / itemHeightInPixels),
    );

    setVisibleRange([startIdx, endIdx]);
  }, [listRef, totalItems]);

  useEffect(() => {
    if (!listRef.current) return;

    // Trigger the calculation on resize as well
    const resizeObserver = new ResizeObserver(calculateVisibleItems);
    resizeObserver.observe(listRef.current);

    // Calculate items once initially in case the list is already visible
    calculateVisibleItems();

    return () => resizeObserver.disconnect();
  }, [calculateVisibleItems, listRef]);

  // Render only visible items with a buffer
  const itemsToRender = useCallback(() => {
    return Array.from({ length: totalItems })
      .slice(visibleRange[0], visibleRange[1] + BUFFER_ITEMS)
      .map((_, index) => visibleRange[0] + index);
  }, [visibleRange, totalItems]);

  return { itemsToRender, calculateVisibleItems };
};
