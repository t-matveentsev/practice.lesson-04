import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBaseCurrency,
  fetchExchangeCurrency,
  fetchLatestSymbols,
} from './operation';

const initialState = {
  baseCurrency: '',
  exchangeInfo: null,
  isLoading: false,
  isError: null,
  rates: [],
};

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchBaseCurrency.fulfilled, (state, { payload }) => {
        state.baseCurrency = payload;
      })
      .addCase(fetchExchangeCurrency.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchExchangeCurrency.fulfilled, (state, { payload }) => {
        state.exchangeInfo = payload;
        state.isLoading = false;
      })
      .addCase(fetchExchangeCurrency.rejected, (state, { payload }) => {
        state.exchangeInfo = null;
        state.isLoading = false;
        state.isError = payload;
      })
      .addCase(fetchLatestSymbols.pending, state => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchLatestSymbols.fulfilled, (state, { payload }) => {
        state.rates = payload;
        state.isLoading = false;
      })
      .addCase(fetchLatestSymbols.rejected, (state, { payload }) => {
        state.exchangeInfo = null;
        state.isLoading = false;
        state.isError = payload;
      }),
});

export const { setBaseCurrency } = currencySlice.actions;

export const currencyReducer = currencySlice.reducer;
