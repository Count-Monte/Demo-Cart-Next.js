import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

import { addToCart } from '@redux/cart.slice';
import styles from '@styles/ProductCard.module.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAdd = useCallback(() => {
    dispatch(addToCart(product));
  }, [product]);
  
  return (
    <div className={styles}>
      <Image src={product.image} height={300} width={220} />
      <h4 className={styles.title}>{product.product}</h4>
      <h5 className={styles.category}>{product.category}</h5>
      <p>$ {product.price}</p>
      <button className={styles.button} onClick={handleAdd}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;