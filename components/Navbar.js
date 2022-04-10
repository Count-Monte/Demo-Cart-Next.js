import Link from 'next/link';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styles from '@styles/Navbar.module.css';

const Navbar = () => {
  const cart = useSelector(state => state.cart);

  const getItemsCount = useCallback(() => cart.reduce((accumulator, item) => accumulator + item.quantity, 0), [cart]);

  return (
    <nav className={styles.navbar}>
      <h6 className={styles.logo}>Test-Cart</h6>
      <ul className={styles.links}>
        <li className={styles.navlink}>
          <Link href="/">Products</Link>
        </li>
        <li className={styles.navlink}>
          <Link href="/cart">
            <p>Cart ({getItemsCount()})</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;