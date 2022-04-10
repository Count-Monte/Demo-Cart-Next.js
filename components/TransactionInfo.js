import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@components/common/Button';
import { getPrice, calcVoucherPrice } from '@utils/currency';
import { clearCart } from '@redux/cart.slice';
import { clearBill } from '@redux/bill.slice';

const TransactionInfo = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector(state => state.cart);
  const bill = useSelector(state => state.bill.bill);

  const getTotalPrice = useCallback(() => cart.reduce(
    (accumulator, item) => accumulator + calcVoucherPrice(item.price, item.quantity, item.voucherCnt || 0),
    0
  ), [cart]);
  
  useEffect(() => {
    if (Object.keys(bill).length === 0) {
      router.push('/');
    }
    return () => {
      dispatch(clearBill());
    }
  }, []);

  const handleConfirm = useCallback(() => {
    dispatch(clearCart());
    dispatch(clearBill());
    router.push('/');
  }, []);

  return (
    <div className='grid grid-flow-col grid-rows-6'>
      {console.log(bill)}
      <div className='flex flex-col row-span-4'>
        {cart.map(cart => (
          <div className='p-4 w-full grid grid-cols-3' key={cart.id}>
            <div>{cart.name}</div>
            <div>{cart.quantity}</div>
            <div>{getPrice(calcVoucherPrice(cart.price, cart.quantity, cart.voucherCnt || 0))}</div>
          </div>
        ))}
      </div>
      <div>Total Price: {getPrice(getTotalPrice())}</div>
      <Button className='grow-0' onClick={handleConfirm}>Confirm</Button>
    </div>
  )
}

export default TransactionInfo;