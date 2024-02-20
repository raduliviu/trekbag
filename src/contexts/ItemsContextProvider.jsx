// Replaced by Zustand implementation

import { createContext, useEffect, useState } from 'react';
import { initialItems } from '../lib/constants';

export const ItemsContext = createContext();

export default function ItemsContextProvider({ children }) {
  const [items, setItems] = useState(
    () => JSON.parse(localStorage.getItem('items')) || initialItems
  );

  const handleAddItem = (newItemText) => {
    const newItem = {
      id: new Date().getTime(),
      name: newItemText,
      packed: false,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
  };

  const handleDeleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleToggleItem = (id) => {
    // My attempt
    // 1. Find the item in the items array being clicked
    // 2. Change its "packed" property to the opposite
    // 3. Create a new array that copies previous objects, but replaces this one
    // 4. Set the setItems state to that new array
    // const foundItemIndex = items.findIndex((item) => item.id === id);
    // const newObj = {
    //   ...items[foundItemIndex],
    //   packed: !items[foundItemIndex].packed,
    // };
    // const newItems = items.toSpliced(foundItemIndex, 1, newObj);

    // Proper solution shown in video
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, packed: !item.packed };
      }

      return item;
    });
    setItems(newItems);
  };

  const handleRemoveAllItems = () => {
    setItems([]);
  };

  const handleResetToInitial = () => {
    setItems(initialItems);
  };

  const handleMarkAllComplete = () => {
    const newItems = items.map((item) => ({ ...item, packed: true }));
    setItems(newItems);
  };

  const handleMarkAllIncomplete = () => {
    const newItems = items.map((item) => ({ ...item, packed: false }));
    setItems(newItems);
  };

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  return (
    <ItemsContext.Provider
      value={{
        items,
        handleAddItem,
        handleDeleteItem,
        handleToggleItem,
        handleRemoveAllItems,
        handleResetToInitial,
        handleMarkAllComplete,
        handleMarkAllIncomplete,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
}
