import TransactionInfo from '@components/TransactionInfo';

const styles = {
  container: 'p-8 text-center',
  title: 'text-4xl uppercase my-4'
}

const ProductsPage = ({ products }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Check</h1>
      <TransactionInfo />
    </div>
  );
};

export default ProductsPage;