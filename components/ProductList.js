import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import Table from '@components/common/Table';
import Pagination from '@components/common/Pagination';
import { addToCart } from '@redux/cart.slice';
import { fetchProductByPage, fetchProductCount } from '@redux/product.slice';
import { getPrice } from '@utils/currency';
import Button from '@components/common/Button';

const COUNT_PER_PAGE = 5;

const styles = {
  button: 'uppercase px-3 bg-transparent border-2 border-black border-solid'
};

const ProductList = () => {
  const dispatch = useDispatch();

  const [pageNo, setPageNo] = useState(1);
  const products = useSelector(state => state.product?.products);
  const productCount = useSelector(state => state.product?.count);

  useEffect(() => {
    dispatch(fetchProductCount());
    dispatch(fetchProductByPage({pageNo, pageCount: COUNT_PER_PAGE}));
  }, []);

  const handlePageForeward = useCallback(() => {
    if (pageNo * COUNT_PER_PAGE < productCount) {
      setPageNo(pageNo + 1);
    }
  }, [productCount, pageNo]);
  
  const handlePageBackward = useCallback(() => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  }, [productCount, pageNo]);

  const handleAdd = useCallback((product) => {
    dispatch(addToCart(product));
  }, []);

  useEffect(() => dispatch(fetchProductByPage({pageNo, pageCount: COUNT_PER_PAGE})), [pageNo]);

  const columns = useMemo(() => [
    {
      Header: 'Image',
      Cell: ({row}) => (
        <Image src={row.original.image} height="90" width="65" />
      )
    },
    {
      Header: 'Name',
      accessor: 'name'
    },
    {
      Header: 'Description',
      accessor: 'description'
    },
    {
      Header: 'Price',
      Cell: ({row}) => (
        <>
          {getPrice(row.original.price)}
        </>
      )
    },
    {
      Header: 'Action',
      Cell: ({row}) => (
        <Button className={styles.button} onClick={() => handleAdd(row.original)}>Add to Cart</Button>
      )
    }
  ]);

  return (
    <>
      {products?.length && <Table columns={columns} data={products} />}
      <Pagination
        countPerPage = {COUNT_PER_PAGE}
        totalCount = {productCount}
        paginateFront = {handlePageForeward}
        paginateBack = {handlePageBackward}
        currentPage = {pageNo}
      />
    </>
  );
}

export default ProductList;