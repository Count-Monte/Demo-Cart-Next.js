import data from './data.json';

export const getProducts = (pageNo = 1, pageSize = 5) => {
  return data.slice((pageNo - 1) * pageSize, pageNo * pageSize);
}

export const getProductCount = () => data.length;

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  } else {
    const products = getProducts();
    res.status(200).json(products);
  }
}