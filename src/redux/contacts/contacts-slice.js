import { nanoid } from 'nanoid';
import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact: {
      reducer: (store, { payload }) => {
        store.push(payload);
      },
      prepare: data => {
        return {
          payload: {
            ...data,
            id: nanoid(),
          },
        };
      },
    },
    removeContact: (store, { payload }) =>
      store.filter(({ id }) => id !== payload),
  },
});

export const { addContact, removeContact } = contactsSlice.actions;
// console.log(addContact.type);
export const contactsReducer = contactsSlice.reducer;
