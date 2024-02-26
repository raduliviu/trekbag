import Select from 'react-select';
import EmptyView from './EmptyView';
import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { itemsActions } from '../stores/itemsSlice';

const sortingOptions = [
  { value: 'default', label: 'Sort by default' },
  { value: 'packed', label: 'Sort by packed' },
  { value: 'unpacked', label: 'Sort by unpacked' },
];

export default function ItemList() {
  const [sortBy, setSortBy] = useState('default');
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const deleteItem = (id) => dispatch(itemsActions.deleteItem(id));
  const toggleItem = (id) => dispatch(itemsActions.toggleItem(id));

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === 'packed') {
          return b.packed - a.packed;
        }

        if (sortBy === 'unpacked') {
          return a.packed - b.packed;
        }

        return;
      }),
    [sortBy, items]
  );

  return (
    <ul className='item-list'>
      {items.length === 0 ? <EmptyView /> : null}

      {items.length > 0 ? (
        <section className='sorting'>
          <Select
            defaultValue={sortingOptions[0]}
            onChange={(option) => setSortBy(option.value)}
            options={sortingOptions}
          />
        </section>
      ) : null}

      {sortedItems.map((item) => (
        <Item
          item={item}
          key={item.id}
          onDeleteItem={deleteItem}
          onToggleItem={toggleItem}
        />
      ))}
    </ul>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li className='item'>
      <label>
        <input
          type='checkbox'
          checked={item.packed}
          onChange={() => {
            onToggleItem(item.id);
          }}
        />
        {item.name}
      </label>
      <button
        onClick={() => {
          onDeleteItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
