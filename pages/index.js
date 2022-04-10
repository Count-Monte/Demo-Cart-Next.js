import ProductCard from '@components/ProductCard';
import { useTable, usePagination } from 'react-table'

import ProductList from '@components/ProductList';
import styles from '@styles/ProductsPage.module.css';
import { getProducts } from '@/api/products/index';

const ProductsPage = ({ products }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Products</h1>
      <ProductList />
    </div>
  );
};

export default ProductsPage;

export async function getStaticProps() {
  const products = await getProducts();
  return { props: { products } };
}