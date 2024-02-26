import { createSlice } from '@reduxjs/toolkit';
import { initialItems } from '../lib/constants';

const initialState = { items: initialItems };

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = {
        id: new Date().getTime(),
        name: action.payload,
        packed: false,
      };
      const newItems = [...state.items, newItem];
      return { items: newItems };
    },
    deleteItem: (state, action) => {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      return { items: newItems };
    },
    toggleItem: (state, action) => {
      const newItems = state.items.map((item) => {
        if (item.id === action.payload) {
          return { ...item, packed: !item.packed };
        }

        return item;
      });
      return { items: newItems };
    },
    markAllComplete: (state) => {
      const newItems = state.items.map((item) => ({
        ...item,
        packed: true,
      }));
      return { items: newItems };
    },
    markAllIncomplete: (state) => {
      const newItems = state.items.map((item) => ({
        ...item,
        packed: false,
      }));
      return { items: newItems };
    },
    resetToInitial: () => {
      return { items: initialItems };
    },
    removeAllItems: () => {
      return { items: [] };
    },
  },
});

export const itemsActions = itemsSlice.actions;

export default itemsSlice.reducer;
