import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contacts/contacts-slice';
import { getContacts } from 'redux/contacts/contacts-selectors';
import { Notify } from 'notiflix';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const isNameAdded = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const isNumberAdded = contacts.some(contact => contact.number === number);
    if (isNameAdded) {
      Notify.failure(`${name} is alredy in contacts`);
      return;
    } else if (isNumberAdded) {
      Notify.failure(`${number} is alredy in contacts`);
      return;
    }

    onAddContact({ name, number });
    setName('');
    setNumber('');
  };

  const onAddContact = ({ name, number }) => {
    // console.log(payload);
    const action = addContact({ name, number });
    // console.log(action);
    dispatch(action);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          className={css.inputName}
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.inputNumber}
          value={number}
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <button className={css.buttonAdd} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
