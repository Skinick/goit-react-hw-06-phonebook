// import { useState, useEffect } from 'react';
import css from './App.module.css';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Notification from './Notification';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, removeContact } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-actions';
import { getContacts } from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';

function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const onAddContact = ({ name, number }) => {
    if (isDublicate(name)) {
      alert(`${name} is already in contacts`);
      return false;
    }
    const action = addContact({ name, number });
    dispatch(action);
  };

  const onRemoveContact = payload => {
    dispatch(removeContact(payload));
  };

  const isDublicate = name => {
    const normalizedName = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return name.toLowerCase() === normalizedName;
    });
    return Boolean(result);
  };

  const changeFilter = event => {
    dispatch(setFilter(event.currentTarget.value.trim()));
  };

  const getVisisbleContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div className={css.phonebookContainer}>
      <h1 className={css.titlePhonebook}>Phonebook</h1>
      <ContactForm onSubmit={onAddContact} />

      <h2 className={css.titleContacts}>Contacts</h2>
      <div className={css.allContacts}>All contacts: {contacts.length}</div>
      {contacts.length > 0 ? (
        <>
          <Filter value={filter} onChange={changeFilter} />
          <ContactList
            contacts={getVisisbleContacts()}
            onDeleteContact={onRemoveContact}
          />
        </>
      ) : (
        <Notification message="Contact list is empty" />
      )}
    </div>
  );
}

export default App;