import Select from 'react-select';

import symbols from './symbols.json';

import styles from './SelectRates.module.css';

import './ReactSelect.css';
import { useDispatch } from 'react-redux';
import { setBaseCurrency } from '../../redux/currency/currencySlice';

const SelectRates = currency => {
  const dispatch = useDispatch();
  const handelChange = options => {
    dispatch(setBaseCurrency(options.value));
  };
  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        values={{ label: currency, value: currency }}
        options={symbols}
        onChange={handelChange}
        className={styles.select}
        classNamePrefix="react-select"
        isSearchable
      />
    </div>
  );
};

export default SelectRates;
