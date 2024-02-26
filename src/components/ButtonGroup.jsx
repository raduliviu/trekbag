import Button from './Button';
import { useDispatch } from 'react-redux';
import { itemsActions } from '../stores/itemsSlice';

export default function ButtonGroup() {
  const dispatch = useDispatch();
  const markAllComplete = () => {
    dispatch(itemsActions.markAllComplete());
  };
  const markAllIncomplete = () => {
    dispatch(itemsActions.markAllIncomplete());
  };
  const resetToInitial = () => {
    dispatch(itemsActions.resetToInitial());
  };
  const removeAllItems = () => {
    dispatch(itemsActions.removeAllItems());
  };

  return (
    <section className='button-group'>
      <Button buttonType='secondary' onClick={markAllComplete}>
        Mark all as complete
      </Button>
      <Button buttonType='secondary' onClick={markAllIncomplete}>
        Mark all as incomplete
      </Button>
      <Button buttonType='secondary' onClick={resetToInitial}>
        Reset to initial
      </Button>
      <Button buttonType='secondary' onClick={removeAllItems}>
        Remove all items
      </Button>
    </section>
  );
}
