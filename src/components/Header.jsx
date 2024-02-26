import Counter from './Counter';
import Logo from './Logo';
import { useSelector } from 'react-redux';

export default function Header() {
  const items = useSelector((state) => state.items.items);

  return (
    <header>
      <Logo />
      <Counter
        numberOfItemsPacked={
          items.filter((item) => item.packed === true).length
        }
        totalNumberOfItems={items.length}
      />
    </header>
  );
}
