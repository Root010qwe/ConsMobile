import { configureStore } from '@reduxjs/toolkit';
import { serviceReducer } from './cardSlice';

export const store = configureStore({ reducer: { service: serviceReducer } });