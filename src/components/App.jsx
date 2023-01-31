import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Form from './Form';
import ContactsList from './ContactsList';
import Filter from './Filter';
import styles from './App.module.css';
class App extends Component {
  state = {
    contacts: [
      { id: nanoid(10), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(10), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(10), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(10), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = contact => {
    const normalName = contact.name.toLowerCase();
    const isNameInList = this.state.contacts.some(contact =>
      contact.name.toLowerCase().includes(normalName)
    );

    if (isNameInList) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }
    contact.id = nanoid(10);
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  searchContact = () => {
    const normalName = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalName)
    );
  };

  filterContact = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
    this.setState({ filter: '' });
  };
  componentDidMount() {
    const myContacts = localStorage.getItem('my-contacts');
    const parsedMyContacts = JSON.parse(myContacts);

    if (parsedMyContacts) {
      this.setState({ contacts: parsedMyContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('my-contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const filteredList = this.searchContact();
    return (
      <div className={styles.container}>
        <h1 className={styles.mainTitle}>Phonebook</h1>
        <Form onSubmit={this.addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <div className={styles.wrap}>
          <Filter value={this.state.filter} onChange={this.filterContact} />
          <ContactsList
            contacts={filteredList}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
