import { useState, useCallback } from 'react';

export const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialState);
  }, [initialState]);

  const setForm = useCallback((data) => {
    setFormData(data);
  }, []);

  return {
    formData,
    handleInputChange,
    resetForm,
    setForm
  };
};