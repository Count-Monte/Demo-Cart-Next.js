import Image from 'next/image';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import AddVoucher from '@components/AddVoucher';
import Button from '@components/common/Button';
import {
  updateQuantity,
  removeFromCart,
} from '@redux/cart.slice';
import styles from '@styles/CartTable.module.css';
import { getPrice, calcVoucherPrice } from '@utils/currency';

const CartTable = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { register, watch, getValues, setValue } = useForm();

  const getTotalPrice = useCallback(() => cart.reduce(
    (accumulator, item) => accumulator + calcVoucherPrice(item.price, item.quantity, item.voucherCnt || 0),
    0
  ), [cart]);

  const renderCartItem = useCallback((item) => {
    setValue(`quantity_${item.id}`, item.quantity);
    return (
      <div className={styles.body} key={item.id}>
        <div className={styles.image}>
          <Image src={item.image} height="90" width="65" />
        </div>
        <p>{item.name}</p>
        <p>$ {item.price}</p>
        <p>
          <input 
            type="number"
            className='w-16'
            {...register(`quantity_${item.id}`, { min: 1 })} 
            onBlur={() => dispatch(
              updateQuantity({
                id: item.id, 
                quantity: parseInt(getValues(`quantity_${item.id}`))
              })
            )}
          />
        </p>
        <div className={styles.buttons}>
          <AddVoucher product={item} />
        </div>
        <p>
          {!item.voucherCnt
            ? (
              <span className='text-grey-500'>{getPrice(item.quantity * item.price)}</span>
            )
            : (
              <>
                <span className='text-red-500 line-through mr-2'>{getPrice(item.quantity * item.price)}</span>
                <span className='text-green-500'>{getPrice(calcVoucherPrice(item.price, item.quantity, item.voucherCnt))}</span>
              </>
            )
          }
        </p>
        <div>
          <Button bgColor={"red"} className="bg-red-500" onClick={() => dispatch(removeFromCart(item.id))}>
            x
          </Button>
        </div>
      </div>
    );
  }, []);

  return (
    <>
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <div className={styles.header}>
            <div>Image</div>
            <div>Name</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Voucher</div>
            <div>Total Price</div>
            <div>Action</div>
          </div>
          {cart.map(renderCartItem)}
          <h2>Grand Total: {getPrice(getTotalPrice())}</h2>
        </>
      )}
    </>
  );
};

export default CartTable;