import { useState } from "react";

export const useDynamicInputs = (initialState = [{ id: 1 }]) => {
  const [inputFields, setInputFields] = useState(initialState);

  // const computeId = (id = {});

  const addInputField = (e) => {
    if (e) e.preventDefault();
    const newId =
      inputFields.length > 0
        ? Math.max(...inputFields.map((f) => f.id)) + 1
        : 1;
    setInputFields([...inputFields, { id: newId }]);
    return newId;
  };

  const handleRemoveField = (indexToRemove) => {
    setInputFields((prevInputFields) =>
      prevInputFields.filter((_, index) => index !== indexToRemove),
    );
  };

  return {
    inputFields,
    setInputFields,
    addInputField,
    handleRemoveField,
  };
};
