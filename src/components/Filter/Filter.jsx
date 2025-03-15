import { useDispatch } from 'react-redux';
import styles from './Filter.module.css';
import { changeFilter } from '../../redux/filter/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(changeFilter(e.target.value.trim().toLowerCase()));
  };
  return (
    <input
      onChange={onChange}
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
    />
  );
};

export default Filter;
