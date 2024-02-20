import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialItems } from '../lib/constants';

export const useItemsStore = create(
  persist(
    (set) => ({
      items: initialItems,
      addItem: (newItemText) => {
        set((state) => {
          const newItem = {
            id: new Date().getTime(),
            name: newItemText,
            packed: false,
          };
          const newItems = [...state.items, newItem];
          return { items: newItems };
        });
      },
      deleteItem: (id) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          return { items: newItems };
        });
      },
      toggleItem: (id) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === id) {
              return { ...item, packed: !item.packed };
            }

            return item;
          });
          return { items: newItems };
        });
      },
      markAllComplete: () => {
        set((state) => {
          const newItems = state.items.map((item) => ({
            ...item,
            packed: true,
          }));
          return { items: newItems };
        });
      },
      markAllIncomplete: () => {
        set((state) => {
          const newItems = state.items.map((item) => ({
            ...item,
            packed: false,
          }));
          return { items: newItems };
        });
      },
      resetToInitial: () => {
        set(() => ({
          items: initialItems,
        }));
      },
      removeAllItems: () => {
        set(() => ({ items: [] }));
      },
    }),
    { name: 'items-storage' }
  )
);
