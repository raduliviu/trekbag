import AddItemForm from './AddItemForm';
import ButtonGroup from './ButtonGroup';
import { itemsActions } from '../stores/itemsSlice';
import { useDispatch } from 'react-redux';

export default function Sidebar() {
  const dispatch = useDispatch();
  const addItem = (name) => dispatch(itemsActions.addItem(name));

  return (
    <div className='sidebar'>
      <AddItemForm onAddItem={addItem} />
      <ButtonGroup />
    </div>
  );
}
