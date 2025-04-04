import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

const ITEM_HEIGHT = 80; // Approximate height of each message
const LOAD_MORE_THRESHOLD = 5; // Number of items from the end to trigger loading more

const MessageList = ({ messages, messagesEndRef, onLoadMore, hasNextPage, isLoading }) => {
  const { user } = useAuth();
  const [listHeight, setListHeight] = useState(0);
  const listRef = useRef(null);
  const listInstanceRef = useRef(null);

  // Scroll to bottom when messages change or when component mounts
  useEffect(() => {
    if (listInstanceRef.current) {
      listInstanceRef.current.scrollToItem(messages.length - 1, 'end');
    }
  }, [messages]);

  useEffect(() => {
    // Update list height when window size changes
    const updateHeight = () => {
      if (listRef.current) {
        setListHeight(listRef.current.clientHeight);
      }
    };

    window.addEventListener('resize', updateHeight);
    updateHeight();

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const isItemLoaded = (index) => {
    return !hasNextPage || index < messages.length;
  };

  const loadMoreItems = (startIndex, stopIndex) => {
    if (!isLoading && hasNextPage) {
      onLoadMore();
    }
  };

  const MessageItem = ({ index, style }) => {
    const msg = messages[index];
    if (!msg) return null;

    return (
      <div
        style={{
          ...style,
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: msg.sender_id === user.id ? 'flex-end' : 'flex-start',
        }}
      >
        <div
          className={`max-w-[70%] rounded-lg p-3 ${
            msg.sender_id === user.id
              ? 'bg-indigo-600 dark:bg-indigo-700 text-white'
              : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
          }`}
        >
          <p className="break-words">{msg.message}</p>
          <p className={`text-xs mt-1 ${
            msg.sender_id === user.id 
              ? 'text-indigo-200 dark:text-indigo-300' 
              : 'text-gray-400 dark:text-gray-500'
          }`}>
            {new Date(msg.created_at).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div ref={listRef} className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-800">
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={messages.length + (hasNextPage ? 1 : 0)}
            loadMoreItems={loadMoreItems}
            threshold={LOAD_MORE_THRESHOLD}
          >
            {({ onItemsRendered, ref }) => (
              <List
                ref={(list) => {
                  ref(list);
                  listInstanceRef.current = list;
                }}
                height={height}
                itemCount={messages.length + (hasNextPage ? 1 : 0)}
                itemSize={ITEM_HEIGHT}
                onItemsRendered={onItemsRendered}
                width={width}
                initialScrollOffset={messages.length * ITEM_HEIGHT}
              >
                {MessageItem}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
      {isLoading && (
        <div className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList; 