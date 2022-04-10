export const getPrice = (price) => {
  if (typeof price !== 'number') {
    price = parseFloat(price);
  }

  return `$ ${parseFloat(price).toFixed(2)}`;
}

export const calcVoucherPrice = (price, count, voucherCnt, ratio = 0.5) => 
  price * (count - voucherCnt) + price * voucherCnt * ratio; 
