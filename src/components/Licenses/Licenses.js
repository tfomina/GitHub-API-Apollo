import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const LICENSES = gql`
  {
    licenses {
      key
      name
      id
    }
  }
`;

export const Licenses = ({ license = null, handleLicenseChange }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderWidth: "1px",
      borderColor: state.isFocused ? "#80bdff!important" : "#ced4da!important",
      boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0,123,255,.25)" : "none",
      borderRadius: ".25rem",
      color: "#495057"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "#80bdff"
        : state.isSelected
        ? "#007bff"
        : "#FFF"
    })
  };

  const { data } = useQuery(LICENSES);

  return (
    <div className="flex-grow-1">
      <Select
        styles={customStyles}
        isOptionSelected={option => license && license.id === option.id}
        onChange={handleLicenseChange}
        options={(data && data.licenses) || []}
        getOptionLabel={option => option.name}
        getOptionValue={option => option.id}
        placeholder="Выберите тип лицензии"
        isSearchable={true}
        isClearable={true}
        noOptionsMessage={() => "Ничего не найдено"}
      />
    </div>
  );
};

Licenses.propTypes = {
  license: PropTypes.object,
  handleLicenseChange: PropTypes.func
};
