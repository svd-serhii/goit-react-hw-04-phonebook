import { useState } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form';
import ContactsList from './ContactsList';
import Filter from './Filter';
import styles from './App.module.css';
import useLocaleStorage from './Hooks/useLocaleStorage';

const App = () => {
  const exampleContacts = [
    { id: nanoid(10), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(10), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(10), name: 'Eden Clements', number: '645-17-79' },
    { id: nanoid(10), name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useLocaleStorage('contacts', exampleContacts);

  const [filter, setFilter] = useState('');

  const addContact = ({ id, name, number }) => {
    const contact = {
      id: nanoid(10),
      name,
      number,
    };

    const normalize = name.toLowerCase();
    const isNameInList = contacts.find(
      contact => contact.name.toLowerCase() === normalize
    );

    if (isNameInList) {
      alert(`${name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const searchContact = () => {
    if (!filter) {
      return contacts;
    }
    const normalize = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalize)
    );
  };

  const filterContact = ({ target }) => setFilter(target.value);

  const filteredList = searchContact();
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Phonebook</h1>
      <Form onSubmit={addContact} />
      <h2 className={styles.title}>Contacts</h2>
      <div className={styles.wrap}>
        <Filter value={filter} onChange={filterContact} />
        <ContactsList contacts={filteredList} onDeleteContact={deleteContact} />
      </div>
    </div>
  );
};

export default App;
