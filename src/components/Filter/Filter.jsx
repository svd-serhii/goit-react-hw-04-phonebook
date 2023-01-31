import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <label className={styles.labelFilter}>
      Find contacts by name
      <input
        className={styles.inputFilter}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter name here"
      />
    </label>
  );
};
Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
