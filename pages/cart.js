import Image from 'next/image';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CartTable from '@components/CartTable';
import BillForm from '@components/BillForm';
import {
  incrementQuantity,
  updateQuantity,
  decrementQuantity,
  removeFromCart,
} from '@redux/cart.slice';
import { getPrice, calcVoucherPrice } from '@utils/currency';

const styles = {
  tableContainer: 'p-8 text-center col-span-3',
  billContainer: 'p-8 text-center col-span-2',
  gridContainer: 'grid grid-cols-5 gap-2',
}

const CartPage = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.gridContainer}>
      <div className={styles.tableContainer}>
        <CartTable />
      </div>
      <div className={styles.billContainer}>
        <BillForm />
      </div>
    </div>
  );
};

export default CartPage;