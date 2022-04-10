import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import Button from '@components/common/Button';
import { sendBill } from '@redux/bill.slice';

const BillForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, watch, handleSubmit, getValues, setValue, formState: { errors } } = useForm();

  const handleRegister = useCallback(async data => {
    const billData = {...data};
    const rlt = await dispatch(sendBill(billData)).unwrap();
    router.push('/check');
  }, []);
  
  return (
    <form className='grid grid-flow-col grid-rows-5' onSubmit={handleSubmit(handleRegister)}>
      <input
        type='text'
        className={clsx('m-1', {'border-red-500': errors.name})}
        placeholder='Name'
        {...register('name', { required: true })}
      />
      <input
        type='email'
        novalidate
        className={clsx('m-1', {'border-red-500': errors.email})}
        placeholder='Email address'
        {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
      />
      <input
        type='text'
        novalidate
        className={clsx('m-1', {'border-red-500': errors.phone})}
        placeholder='Phone number'
        {...register('phone', { required: true, pattern: /^\+(\([0-9]{3}\)|[0-9]{1} [0-9]{2} )[0-9]{3} [0-9]{2}$/gm })}
      />
      <input
        type='text'
        novalidate
        className={clsx('m-1', {'border-red-500': errors.address})}
        placeholder='Country, City, Address, Zip'
        {...register('address', { required: true, pattern: /^[\w\s]+, [\w\s]+, [\w\s]+, [0-9]+$/g })}
      />
      <div>
        <Button type='submit'>Next</Button>
      </div>
    </form>
  );
};

export default BillForm;