import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import Button from '@components/common/Button';
import { addVoucher } from '@redux/cart.slice';

const AddVoucher = ({product}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm();

  useEffect(() => {
    if (product.voucherCnt) {
      setValue('voucher-cnt', product.voucherCnt);
    }
  }, [product.voucherCnt]);

  const handleRegister = useCallback((data) => {
    setShowModal(false);
    dispatch(addVoucher({
      id: product.id,
      quantity: parseInt(data['voucher-cnt'])
    }))
  }, [watch('voucher-cnt'), product.id]);
  
  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
      >
        Add Voucher
      </Button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <form
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                onSubmit={handleSubmit(handleRegister)}
              >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Voucher
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-50 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <input
                    className="rounded text-pink-500"
                    type="number"
                    placeholder='Voucher Count'
                    {...register('voucher-cnt')}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default AddVoucher;