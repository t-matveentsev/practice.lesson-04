import { Wave } from 'react-animated-text';

import Section from '../components/Section/Section';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectBaseCurrency,
  selectFilteredRates,
  selectIsError,
  selectIsLoading,
  selectRates,
} from '../redux/selectors';
import { fetchLatestSymbols } from '../redux/currency/operation';
import { useEffect } from 'react';
import RatesList from '../components/RatesList/RatesList';
import Loader from '../components/Loader/Loader';
import Filter from '../components/Filter/Filter';

const Rates = () => {
  const isError = useSelector(selectIsError);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const baseCurrency = useSelector(selectBaseCurrency);
  const filterCurrency = useSelector(selectFilteredRates);
  const rates = useSelector(selectRates);

  useEffect(() => {
    dispatch(fetchLatestSymbols(baseCurrency));
  }, [baseCurrency, dispatch]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {rates.length > 0 && <Filter />}
        {filterCurrency.length > 0 && <RatesList rates={filterCurrency} />}
        {isLoading && <Loader />}

        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
