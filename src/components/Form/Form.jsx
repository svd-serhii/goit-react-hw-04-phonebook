import PropTypes from 'prop-types';
import styles from './Form.module.css';
import useLocaleStorage from './components/Hooks';

const Form = ({ onSubmit }) => {
  const [name, setName] = useLocaleStorage('name', '');
  const [number, setNumber] = useLocaleStorage('number', '');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    this.reset();
  };

  const handleChange = e => {
    const { name, value } = e.target;
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

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <label className={styles.formLabel}>
          Name
          <input
            className={styles.formInput}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}
            placeholder="Input name of contact"
          />
        </label>
        <label className={styles.formLabel}>
          Number
          <input
            className={styles.formInput}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}
            placeholder="Input telephone number"
          />
        </label>
        <button className={styles.formBtn} type="submit">
          Add contact
        </button>
      </div>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;

// class Form extends Component {
//   state = { name: '', number: '' };

//   handleChange = e => {
//     const { name, value } = e.currentTarget;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     this.props.onSubmit(this.state);
//     this.reset();
//   };

//   reset = e => {
//     this.setState({ name: '', number: '' });
//   };

//   render() {
// return (
//   <form className={styles.form} onSubmit={this.handleSubmit}>
//     <div className={styles.formContainer}>
//       <label className={styles.formLabel}>
//         Name
//         <input
//           className={styles.formInput}
//           type="text"
//           name="name"
//           pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
//           title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//           required
//           value={this.state.name}
//           onChange={this.handleChange}
//           placeholder="Input name of contact"
//         />
//       </label>
//       <label className={styles.formLabel}>
//         Number
//         <input
//           className={styles.formInput}
//           type="tel"
//           name="number"
//           pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
//           title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//           required
//           value={this.state.number}
//           onChange={this.handleChange}
//           placeholder="Input telephone number"
//         />
//       </label>
//       <button className={styles.formBtn} type="submit">
//         Add contact
//       </button>
//     </div>
//   </form>
// );
//   }
// }
