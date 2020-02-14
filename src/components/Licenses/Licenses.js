import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Select from "react-select";

export const Licenses = ({ license = null, handleLicenseChange }) => {
  const [options, setOptions] = useState([]);

  const fetchLicenses = async () => {
    try {
      const response = await axios("https://api.github.com/licenses");
      setOptions(response.data);
    } catch (error) {
      setOptions([]);
    }
  };

  useEffect(() => {
    fetchLicenses();
  }, []);

  return (
    <div className="flex-grow-1">
      <Select
        isOptionSelected={option =>
          license && license.node_id === option.node_id
        }
        onChange={handleLicenseChange}
        options={options}
        getOptionLabel={option => option.name}
        getOptionValue={option => option.node_id}
        placeholder="Выберите тип лицензии"
        isSearchable={true}
        isClearable={true}
      />
    </div>
  );
};

Licenses.propTypes = {
  license: PropTypes.object,
  handleLicenseChange: PropTypes.func
};
