import { useItemsStore } from '../stores/itemsStore';
import Button from './Button';

export default function ButtonGroup() {
  const markAllComplete = useItemsStore((state) => state.markAllComplete);
  const markAllIncomplete = useItemsStore((state) => state.markAllIncomplete);
  const resetToInitial = useItemsStore((state) => state.resetToInitial);
  const removeAllItems = useItemsStore((state) => state.removeAllItems);

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
