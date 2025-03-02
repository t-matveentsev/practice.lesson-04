import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';

import { useDispatch } from 'react-redux';
import { fetchBaseCurrency } from './redux/currency/operation';
import { setBaseCurrency } from './redux/currency/currencySlice';

const Home = lazy(() => import('./pages/Home'));
const Rates = lazy(() => import('./pages/Rates'));

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    function success({ coords }) {
      dispatch(fetchBaseCurrency(coords));
    }
    function error() {
      dispatch(setBaseCurrency('USD'));
    }
    navigator.geolocation.getCurrentPosition(success, error);
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/rates" element={<Rates />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
