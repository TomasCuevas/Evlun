import { useState } from 'react';

export const useCheckbox = (values) => {
  const [checkboxValues, setCheckboxValues] = useState(values);

  const onCheckboxChange = ({ target }) => {
    const newValues = { ...checkboxValues };

    Object.keys(newValues).map((key) => {
      if (key === target.name) {
        return (newValues[key] = true);
      }
      return (newValues[key] = false);
    });

    setCheckboxValues(() => newValues);
  };

  return {
    // properties
    ...checkboxValues,
    checkboxValues,

    // methods
    onCheckboxChange,
  };
};
