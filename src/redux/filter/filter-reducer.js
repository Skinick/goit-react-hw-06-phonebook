import { createReducer } from '@reduxjs/toolkit';
import { setFilter } from './filter-actions';

const filterReducer = createReducer('', {
  [setFilter]: (_, action) => action.payload,
});

export default filterReducer;