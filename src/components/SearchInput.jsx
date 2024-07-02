/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search results..."
      value={value}
      onChange={onChange}
      className="bg-gray-200 text-gray-800 outline-none px-3 py-2 rounded-md"
    />
  );
};

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
