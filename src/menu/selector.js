import React from "react";
import Select from "react-select";

const Selector = ({ options, selected, onSelect, isDisabled, placeholder }) => {
  const _opt = options.map((item, index) => ({
    value: index,
    label: item,
  }));

  console.log({ placeholder });

  return (
    <div className="formSelector">
      <Select
        isDisabled={isDisabled}
        placeholder={placeholder}
        value={selected}
        onChange={onSelect}
        options={_opt}
      />
    </div>
  );
};

export default Selector;
