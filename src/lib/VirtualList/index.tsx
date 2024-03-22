import React, { useRef, CSSProperties } from 'react';

import { usePartialListRendering } from '@/shared/hooks/usePartialListRendering';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';

interface VirtualListProps<ItemType> {
  items: ItemType[];
  itemHeightInRem: number;
  hasMore: boolean;
  style?: CSSProperties;
  className?: string;
  onLoadMore: () => void;
  renderItem: (item: ItemType, style: CSSProperties) => React.ReactNode;
}

export const VirtualList = <ItemType,>({
  items,
  renderItem,
  itemHeightInRem,
  onLoadMore,
  hasMore,
  ...props
}: VirtualListProps<ItemType>) => {
  const listRef = useRef<HTMLDivElement>(null);
  const { itemsToRender, calculateVisibleItems } = usePartialListRendering(
    listRef,
    items.length,
    itemHeightInRem,
  );

  const innerContainerStyle: CSSProperties = {
    height: `${items.length * itemHeightInRem}rem`,
    position: 'relative',
  };

  useInfiniteScroll({
    rootRef: listRef,
    onScrollToEnd: onLoadMore,
    hasMore,
  });

  return (
    <div ref={listRef} onScroll={calculateVisibleItems} {...props}>
      <div style={innerContainerStyle}>
        {itemsToRender.map((index) => {
          const item = items[index];
          const style: CSSProperties = {
            position: 'absolute',
            top: `${index * itemHeightInRem}rem`,
            left: 0,
            right: 0,
            height: `${itemHeightInRem}rem`,
          };

          return renderItem(item, style);
        })}
      </div>
    </div>
  );
};
